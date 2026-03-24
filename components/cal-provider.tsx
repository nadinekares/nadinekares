"use client";

import { useCal, useCalPicker } from "@/hooks/use-cal";
import { CalPicker } from "@/components/cal-picker";

export function CalProvider() {
  useCal();
  const { open, onClose } = useCalPicker();
  return <CalPicker open={open} onClose={onClose} />;
}
