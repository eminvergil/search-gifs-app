import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";

import { QueryClient, useQuery, QueryClientProvider } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { useSnapshot } from "valtio";
import { FETCH_LIMIT, SPACING, windowHeight, windowWidth } from "../constant";
import { InputState } from "../state/globalContext";
import { changeText } from "../store/slice/inputSlice";
import { TouchableButton } from "./TouchableButton";

export default function Search() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  function handleInput(text) {
    setInput(text);
    dispatch(changeText(text));
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Search GIFS!!</Text>
        <TextInput
          style={styles.input}
          placeholder="Cat"
          onChangeText={(text) => handleInput(text)}
          defaultValue={input}
        />
      </View>

      <FetchDataWrapper />
    </View>
  );
}

const queryClient = new QueryClient();

function FetchDataWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <GetGiphy />
    </QueryClientProvider>
  );
}

function GetGiphy() {
  // const snap = useSnapshot(InputState);

  const state = useSelector((state) => state.inputItem);
  const [limit, setLimit] = useState(20);

  let url1 = `https://api.giphy.com/v1/gifs/search?q=${state.text}`;
  let url2 = "https://api.giphy.com/v1/gifs/trending?";
  let apiKey = "3mIxmBZUIIPyb8R69gtxaW8Hsh74dFKV";
  let offset = 0;

  useEffect(() => {
    console.log("li: ", limit);
  }, [limit]);

  const {
    isLoading,
    isError,
    error,
    data,
    refetch,
    isFetching,
    isPreviousData,
  } = useQuery(
    ["getGifs", limit],
    () =>
      fetch(`${url1}&limit=${limit}&offset=${offset}&api_key=${apiKey}`).then(
        (res) => res.json()
      ),
    {
      // enabled: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      keepPreviousData: true,
    }
  );

  const LoadMoreFunction = () => {
    console.log(limit);
  };
  return (
    <View>
      {/* {TouchableButton(refetch, "Get Gifs")} */}
      <TouchableButton onPressFunction={refetch} text="Get Gifs" />

      <SafeAreaView style={{ marginTop: SPACING }}>
        <GetGiphyStatus isLoading={isLoading} error={error} data={data} />
      </SafeAreaView>
      {/* {console.log(data?.data.length, isFetching, isLoading)} */}
      {!isLoading && data?.data.length !== 0 && (
        <TouchableButton
          onPress={LoadMoreFunction}
          text="Load More"
          limit={limit}
        />
      )}
    </View>
  );
}

function GetGiphyStatus({ isLoading, error, data }) {
  if (isLoading)
    return <Text className="text-xl text-primary">Loading... </Text>;

  if (error)
    return (
      <Text className="text-xl text-primary">
        An error has occurred: + {error.message}
      </Text>
    );
  return <FlatlistContainer data={data} />;
}

function RenderItem({ item }) {
  return (
    <TouchableOpacity
      onPress={() => console.log(item.title)}
      style={{
        backgroundColor: "gray",
        borderRadius: 6,
        // margin: SPACING,
        marginBottom: SPACING,
        padding: SPACING,
        width: windowWidth - SPACING,
      }}
    >
      <Text style={{ color: "white" }}>{item.title}</Text>
      <Text style={{ color: "#dddd", fontSize: 10 }}>
        Date: {item.trending_datetime}
      </Text>
      <Image
        style={{ height: 200, margin: 5, borderRadius: 6, zIndex: 10 }}
        source={{ uri: item.images["preview_gif"].url }}
      />
    </TouchableOpacity>
  );
}

function FlatlistContainer({ data }) {
  // console.log(data?.data);
  return (
    <SafeAreaView
      style={{
        maxHeight: windowHeight - windowHeight * 0.4,
        marginBottom: SPACING,
      }}
    >
      <FlatList
        data={data?.data}
        style={{ maxHeight: windowHeight - windowHeight * 0.2 }}
        contentContainerStyle={{}}
        keyExtractor={data?.data.id}
        renderItem={({ item }) => {
          return <RenderItem item={item} />;
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: SPACING * 2,
  },
  header: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    fontStyle: "normal",
    marginBottom: 2,
  },
  input: {
    fontSize: 25,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 6,
    padding: 5,
    marginBottom: 1,
  },
  button: {
    borderRadius: 6,
    fontSize: 15,
  },
});
