import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";
import{reportRepository}from"./api.report";

import type{UpdateReportInput}from"../types.report";export function useUpdateReport(){const c = useQueryClient();return useMutation({
    mutationFn:({id,input}:{id:string;input:UpdateReportInput})=>reportRepository.update(id,input),
    onSuccess:(r)=>{c.setQueryData(queryKeys.reports.detail(r.id),r);c.invalidateQueries({queryKey:queryKeys.reports.all})}});}
