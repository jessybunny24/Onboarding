"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, AlertCircle, Check } from "lucide-react";

export interface DropdownOption {
  value: string;
  label: string;
  badge?: string;
  description?: string;
}

export interface DropdownProps {
  id?: string;
  label?: string;
  options: DropdownOption[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  className?: string;
  onChange?: (value: string) => void;
}

export default function Dropdown({
  id = "custom-dropdown",
  label,
  options,
  value,
  defaultValue,
  placeholder = "Select an option...",
  required = false,
  disabled = false,
  error,
  helperText,
  className = "",
  onChange,
}: DropdownProps) {
  const [internalValue, setInternalValue] = useState<string>(
    value ?? defaultValue ?? ""
  );
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedValue = value !== undefined ? value : internalValue;
  const selectedOption = options.find((opt) => opt.value === selectedValue);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    if (disabled) return;
    setInternalValue(val);
    setIsOpen(false);
    onChange?.(val);
  };

  return (
    <div className={`w-full space-y-2 ${className}`} ref={dropdownRef}>
      {label && (
        <label
          htmlFor={`${id}-trigger`}
          className="block text-xs font-mono uppercase tracking-wider text-slate-300"
        >
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      )}

      {/* Hidden standard select for native form compatibility & automated testing */}
      <select
        id={id}
        name={id}
        value={selectedValue}
        onChange={(e) => handleSelect(e.target.value)}
        disabled={disabled}
        required={required}
        data-testid={`${id}-native-select`}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Custom Accessible Trigger */}
      <div className="relative">
        <button
          id={`${id}-trigger`}
          type="button"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={`${id}-menu`}
          aria-label={label || placeholder}
          disabled={disabled}
          onClick={() => setIsOpen((prev) => !prev)}
          data-testid={`${id}-trigger`}
          className={`w-full px-4 py-3.5 rounded-xl bg-[#07090e] border text-left text-sm flex items-center justify-between transition-all duration-200 focus:outline-none focus:ring-2 ${
            error
              ? "border-red-500/80 focus:ring-red-500 text-red-200"
              : isOpen
              ? "border-blue-500 ring-2 ring-blue-500/40 text-white"
              : "border-slate-800 hover:border-slate-700 text-white"
          } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        >
          <span className="truncate">
            {selectedOption ? (
              <span className="flex items-center gap-2">
                <span className="font-medium text-slate-100">
                  {selectedOption.label}
                </span>
                {selectedOption.badge && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-950 border border-blue-800/50 text-blue-300">
                    {selectedOption.badge}
                  </span>
                )}
              </span>
            ) : (
              <span className="text-slate-400 font-normal">{placeholder}</span>
            )}
          </span>

          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ml-2 ${
              isOpen ? "rotate-180 text-blue-400" : ""
            }`}
          />
        </button>

        {/* Dropdown Menu Listbox */}
        {isOpen && (
          <ul
            id={`${id}-menu`}
            role="listbox"
            aria-labelledby={`${id}-trigger`}
            data-testid={`${id}-menu`}
            className="absolute z-50 mt-2 w-full max-h-60 overflow-auto rounded-2xl bg-[#0c101d] border border-slate-700/80 shadow-2xl shadow-black/80 py-2 focus:outline-none backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150"
          >
            {options.map((opt) => {
              const isSelected = opt.value === selectedValue;
              return (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected}
                  data-testid={`${id}-option-${opt.value}`}
                  onClick={() => handleSelect(opt.value)}
                  className={`px-4 py-2.5 cursor-pointer text-sm flex items-center justify-between transition-colors ${
                    isSelected
                      ? "bg-blue-600/20 text-blue-300 font-semibold"
                      : "text-slate-200 hover:bg-slate-800/80 hover:text-white"
                  }`}
                >
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <span>{opt.label}</span>
                      {opt.badge && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-slate-900 border border-slate-700 text-slate-300">
                          {opt.badge}
                        </span>
                      )}
                    </div>
                    {opt.description && (
                      <span className="text-[11px] font-mono text-slate-400 font-normal">
                        {opt.description}
                      </span>
                    )}
                  </div>

                  {isSelected && (
                    <Check className="w-4 h-4 text-blue-400 shrink-0 ml-2" />
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Helper or Error Message */}
      {error ? (
        <p
          data-testid={`${id}-error`}
          className="text-xs text-red-400 font-mono flex items-center gap-1 mt-1"
        >
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p
          data-testid={`${id}-helper`}
          className="text-xs text-slate-400 font-mono mt-1"
        >
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
