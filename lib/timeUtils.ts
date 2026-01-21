/**
 * Parse time string in format hh:mm:ss.d to seconds
 * @param timeStr - Time string (e.g., "1:23:45.5" or "23:45.5" or "45.5")
 * @returns Number of seconds or null if invalid
 */
export function parseTimeToSeconds(timeStr: string): number | null {
  if (!timeStr || timeStr.trim() === '') {
    return null;
  }

  const trimmed = timeStr.trim();
  const parts = trimmed.split(':');
  
  try {
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    if (parts.length === 3) {
      // hh:mm:ss.d format
      hours = parseInt(parts[0], 10);
      minutes = parseInt(parts[1], 10);
      seconds = parseFloat(parts[2]);
    } else if (parts.length === 2) {
      // mm:ss.d format
      minutes = parseInt(parts[0], 10);
      seconds = parseFloat(parts[1]);
    } else if (parts.length === 1) {
      // ss.d format
      seconds = parseFloat(parts[0]);
    } else {
      return null;
    }

    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
      return null;
    }

    if (hours < 0 || minutes < 0 || seconds < 0) {
      return null;
    }

    // Only validate minute/second ranges for multi-part times
    if (parts.length > 1 && (minutes >= 60 || seconds >= 60)) {
      return null;
    }

    return hours * 3600 + minutes * 60 + seconds;
  } catch {
    return null;
  }
}

/**
 * Format seconds to hh:mm:ss.d
 * @param seconds - Number of seconds
 * @param decimals - Number of decimal places (default 1)
 * @returns Formatted time string
 */
export function formatSecondsToTime(seconds: number, decimals: number = 1): string {
  if (seconds < 0) {
    return '0:00.0';
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  // Split into integer and decimal parts
  const secsInt = Math.floor(secs);
  const secsStr = secsInt.toString().padStart(2, '0');
  
  let result: string;
  if (decimals > 0) {
    const decimalPart = (secs - secsInt).toFixed(decimals).substring(1); // Get ".d" part
    result = secsStr + decimalPart;
  } else {
    result = secsStr;
  }

  if (hours > 0) {
    const minStr = minutes.toString().padStart(2, '0');
    return `${hours}:${minStr}:${result}`;
  }
  return `${minutes}:${result}`;
}
