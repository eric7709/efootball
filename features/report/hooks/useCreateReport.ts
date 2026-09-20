import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";
import{reportRepository}from"./api.report";

import type{CreateReportInput}from"../types.report";export function useCreateReport(){const c = useQueryClient();return useMutation({
    mutationFn:(i:CreateReportInput)=>reportRepository.create(i),
    onSuccess:()=>c.invalidateQueries({queryKey:queryKeys.reports.all})});}
