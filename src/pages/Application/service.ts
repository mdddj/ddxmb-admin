

import request from "umi-request";
import {AllAppResult} from "@/pages/Application/model/list_result_model";

// 获取应用列表
export async function getApplicationList(){
    return request<AllAppResult>("/api/app/list");
}
