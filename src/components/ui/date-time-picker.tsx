"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getTimeFromDate } from "@/lib/utils";

type Props = {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
};

export function Calendar24({ value, onChange }: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-3">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker"
              className="w-32 justify-between font-normal"
            >
              {value ? value.toLocaleDateString() : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={value}
              captionLayout="dropdown"
              onSelect={(date) => {
                onChange(date);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-3">
        <Input
          id="time-picker"
          value={value ? getTimeFromDate(value) : ""}
          disabled={!value}
          onChange={(e) => {
            if (!value) return;
            const [hours, minutes, seconds] = e.target.value.split(":");
            const updatedDate = new Date(value);
            updatedDate.setHours(parseInt(hours, 10));
            updatedDate.setMinutes(parseInt(minutes, 10));
            updatedDate.setSeconds(parseInt(seconds, 10));
            onChange(updatedDate);
          }}
          type="time"
          step="1"
          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
    </div>
  );
}
