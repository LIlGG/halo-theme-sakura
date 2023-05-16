import { documentFunction } from "../main";

export default class Index {
  @documentFunction(false)
  public registerIndex() {
    console.log("123");
  }
}