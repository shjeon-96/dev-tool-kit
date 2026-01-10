"use client";

import * as React from "react";
import { Moon, Sun, Monitor, Clock, Check } from "lucide-react";
import { useTheme } from "next-themes";
import {
  useScheduledTheme,
  formatScheduleTime,
  type ThemeScheduleMode,
} from "@/shared/lib/hooks";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "./dropdown-menu";

export function ModeToggle() {
  const { theme } = useTheme();
  const { schedule, updateSchedule, setManualTheme, getStatus, isLoaded } =
    useScheduledTheme();

  const status = getStatus();

  const handleModeChange = (mode: ThemeScheduleMode) => {
    if (mode === "manual") {
      // Keep current theme
      updateSchedule({ mode: "manual" });
    } else if (mode === "system") {
      updateSchedule({ mode: "system" });
    } else if (mode === "scheduled") {
      updateSchedule({ mode: "scheduled" });
    }
  };

  const handleManualTheme = (newTheme: "light" | "dark") => {
    setManualTheme(newTheme);
  };

  const handleScheduleChange = (darkStart: string, darkEnd: string) => {
    updateSchedule({ darkStart, darkEnd, mode: "scheduled" });
  };

  // Predefined schedule options
  const schedulePresets = [
    { label: "Evening (6PM - 6AM)", darkStart: "18:00", darkEnd: "06:00" },
    { label: "Night (8PM - 7AM)", darkStart: "20:00", darkEnd: "07:00" },
    { label: "Late Night (10PM - 6AM)", darkStart: "22:00", darkEnd: "06:00" },
    { label: "Afternoon (5PM - 8AM)", darkStart: "17:00", darkEnd: "08:00" },
  ];

  if (!isLoaded) {
    return (
      <Button variant="ghost" size="icon">
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          {schedule.mode === "scheduled" && (
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-blue-500 rounded-full" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
          Theme Mode
        </DropdownMenuLabel>

        {/* Manual Light */}
        <DropdownMenuItem
          onClick={() => handleManualTheme("light")}
          className="flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <Sun className="h-4 w-4" />
            Light
          </span>
          {schedule.mode === "manual" && theme === "light" && (
            <Check className="h-4 w-4" />
          )}
        </DropdownMenuItem>

        {/* Manual Dark */}
        <DropdownMenuItem
          onClick={() => handleManualTheme("dark")}
          className="flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <Moon className="h-4 w-4" />
            Dark
          </span>
          {schedule.mode === "manual" && theme === "dark" && (
            <Check className="h-4 w-4" />
          )}
        </DropdownMenuItem>

        {/* System */}
        <DropdownMenuItem
          onClick={() => handleModeChange("system")}
          className="flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <Monitor className="h-4 w-4" />
            System
          </span>
          {schedule.mode === "system" && <Check className="h-4 w-4" />}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Scheduled with submenu */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Scheduled
            </span>
            {schedule.mode === "scheduled" && (
              <Check className="h-4 w-4 mr-2" />
            )}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-52">
            <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
              Dark Mode Schedule
            </DropdownMenuLabel>
            {schedulePresets.map((preset) => (
              <DropdownMenuItem
                key={preset.label}
                onClick={() =>
                  handleScheduleChange(preset.darkStart, preset.darkEnd)
                }
                className="flex items-center justify-between"
              >
                <span className="text-sm">{preset.label}</span>
                {schedule.mode === "scheduled" &&
                  schedule.darkStart === preset.darkStart &&
                  schedule.darkEnd === preset.darkEnd && (
                    <Check className="h-4 w-4" />
                  )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        {/* Current status for scheduled mode */}
        {schedule.mode === "scheduled" && status.nextChange && (
          <>
            <DropdownMenuSeparator />
            <div className="px-2 py-1.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500" />
                Dark: {formatScheduleTime(schedule.darkStart)} -{" "}
                {formatScheduleTime(schedule.darkEnd)}
              </div>
              <div className="mt-1">
                Next change in {status.nextChange.hours}h{" "}
                {status.nextChange.minutes}m
              </div>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
