import { render, h } from "preact";
import Game from "./Game";

// Játék betöltése, dimensions adja meg a méretét
render(<Game dimensions={5} />, document.querySelector("#app"));
