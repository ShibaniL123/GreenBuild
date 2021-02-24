//global styles
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  stretch: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  paragraph: {
    margin: 15,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    //color: "white",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 30,
    color: "green",
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "white",
  },
  forgot: {
    color: "green",
    fontSize: 11,
  },
  loginBtn: {
    elevation: 8,
    width: "80%",
    backgroundColor: "green",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  loginText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  input: {
    width: "40%",
    borderWidth: 1,
    alignSelf: "stretch",
    borderColor: "#ddd",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginTop: 10,
    marginHorizontal: 10,
  },

  input1: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  },
  errorText: {
    color: "crimson",
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 6,
    textAlign: "center",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },

  titleText1: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button1: {
    height: 36,
    backgroundColor: "#48BBEC",
    borderColor: "#48BBEC",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: "stretch",
    justifyContent: "center",
  },
  inputtest: {
    borderWidth: 1,
    borderColor: "#ddd",
    alignSelf: "stretch",
    margin: 10,
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 16,
    //height: 40,
  },
  container2: {
    flex: 1,
    paddingVertical: 0,
    backgroundColor: "white",
    alignItems: "stretch",
    justifyContent: "center",
    width: "100%",
  },
  containerlist: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: "transparent",
    alignItems: "stretch",
    justifyContent: "center",
    width: "100%",
  },
  scrollv: {
    paddingVertical: 10,
    marginBottom: 0,
  },
  scrl: {
    width: "90%",
    paddingVertical: 10,
    marginBottom: 20,
  },
  item: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    margin: 10,
    borderColor: "green",
    borderWidth: 1,
    backgroundColor: "green",
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#2e8b57",
    shadowOpacity: 0.9,
    shadowRadius: 5,
    fontWeight: "bold",
    color: "#fff",
  },
  enterbutton: {
    elevation: 6,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 15,
    marginHorizontal: 32,
    marginBottom: 20,
    borderRadius: 6,
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    borderRadius: 10,
  },
  title: {
    borderWidth: 1,
    borderColor: "#fff",
    fontWeight: "bold",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  },

  header: {
    height: 50,
    backgroundColor: "green",
    elevation: 8,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "black",
    shadowOpacity: 0.9,
    shadowRadius: 10,
  },
  text: { textAlign: "center", fontWeight: "100", fontSize: 18 },
  dataWrapper: { marginTop: -1 },
  row: {
    height: 40,
    backgroundColor: "#E7E6E1",
    elevation: 8,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "black",
    shadowOpacity: 1,
    shadowRadius: 20,
  },
  btn: { width: 58, height: 18, backgroundColor: "#78B7BB", borderRadius: 2 },
  btnText: { textAlign: "center", color: "#fff" },
  card1: {
    borderRadius: 15,
    marginBottom: 10,
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    borderRadius: 10,
    elevation: 8,
  },
  datep: {
    justifyContent: "center",
    width: "90%",
    marginBottom: 20,
    color: "rgb(230, 230, 230)",
    padding: 10,
    borderColor: "rgb(242, 242, 242)",
    borderWidth: 1,
    borderRadius: 10,
  },
  inputContainer: {
    backgroundColor: "white",
    borderColor: "#eee",
    borderWidth: 1,
    width: "90%",
    // height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginBottom: 20,
    paddingBottom: 10,
    // padding: 10,
  },
  texti: {
    //height: 40,
    fontSize: 18,
    borderColor: "#bbb",
    borderWidth: 1,
    width: "90%",
    //textAlign: "center",
    borderRadius: 5,
    padding: 5,
  },
});
