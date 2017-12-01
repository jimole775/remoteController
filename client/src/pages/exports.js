/**
 * Created by Andy on 2017/11/18.
 */
import ng from "angular";
import home from "./home/exports.js";
import animation from "./animation.scroll/exports.js";


export default ng.module("pages", [home.name,animation.name]);
