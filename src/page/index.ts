import { documentFunction } from "../main";

export default class Index {
  @documentFunction()
  public registerIndex() {
    console.log("123");
  }
}