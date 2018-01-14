/**
 * Created by Andy on 2017/12/22.
 */

import compiler from "./blob.compiler/blobCompiler.js";
import discompiler from "./blob.discompiler/blobDiscompiler.js";

export default function (){
    return  {
        blobCompiler:compiler
        ,blobDiscompiler:discompiler
    }
};