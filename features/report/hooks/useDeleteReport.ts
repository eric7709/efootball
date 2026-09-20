import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";
import{reportRepository}from"./api.report";export function useDeleteReport(){const c = useQueryClient();return useMutation({
    mutationFn:(id:string)=>reportRepository.delete(id),
    onSuccess:({id})=>{c.removeQueries({queryKey:queryKeys.reports.detail(id)});c.invalidateQueries({queryKey:queryKeys.reports.all})}});}
