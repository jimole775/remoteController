/**
 * Created by Andy on 2018/1/9.
 */
import $ from "jquery";
export default function({prayload}){
    let buttonType = prayload.serverData.buttonType;
    let buttonIndex = prayload.serverData.buttonIndex;

    let target = $("body").find(buttonType)[buttonIndex];

    $(target).trigger("click");

    console.log("worked!");

}