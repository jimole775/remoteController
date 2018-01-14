/**
 * Created by Andy on 2017/12/25.
 */
import conversation from "./user.conversation/exports.js";
import list from "./user.list/exports.js";
import register from "./user.register/exports.js";

export default angular.module("user",[list.name,register.name, conversation.name])