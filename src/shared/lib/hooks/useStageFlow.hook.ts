"use client";
import { useCallback, useState } from "react";

interface Props<T extends string> {
  initialStage: T;
  nextStagesMap: Record<T, T | null>;
  prevStagesMap: Record<T, T | null>;
}

export const useStageFlow = <T extends string>({
  initialStage,
  nextStagesMap,
  prevStagesMap,
}: Props<T>) => {
  const [stage, setStage] = useState<T>(initialStage);

  const next = useCallback(() => {
    const s = nextStagesMap[stage];
    if (s) setStage(s);
  }, [stage]);

  const prev = useCallback(() => {
    const s = prevStagesMap[stage];
    if (s) setStage(s);
  }, [stage]);

  return { stage, next, prev };
};
