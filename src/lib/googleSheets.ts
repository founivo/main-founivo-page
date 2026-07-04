// src/lib/googleSheets.ts
import { Founder } from '@/data/founders';

/**
 * Parses a CSV string into an array of objects.
 * Handles double quotes, commas within quotes, and escaped quotes.
 */
export function parseCSV(csvText: string): Founder[] {
  const lines: string[][] = [];
  let currentLine: string[] = [];
  let currentCell = '';
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (inQuotes) {
      if (char === '"') {
        if (nextChar === '"') {
          currentCell += '"';
          i++; // skip next quote
        } else {
          inQuotes = false;
        }
      } else {
        currentCell += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        currentLine.push(currentCell.trim());
        currentCell = '';
      } else if (char === '\n' || char === '\r') {
        if (char === '\r' && nextChar === '\n') {
          i++; // skip \n
        }
        currentLine.push(currentCell.trim());
        lines.push(currentLine);
        currentLine = [];
        currentCell = '';
      } else {
        currentCell += char;
      }
    }
  }

  if (currentCell || currentLine.length > 0) {
    currentLine.push(currentCell.trim());
    lines.push(currentLine);
  }

  if (lines.length < 2) return [];

  // Normalize headers (lowercase, alphanumeric only)
  const headers = lines[0].map(h => h.toLowerCase().trim().replace(/[^a-z0-9]/g, ''));
  
  return lines.slice(1).map((row, idx) => {
    const obj: any = {};
    headers.forEach((header, index) => {
      const value = row[index] || '';
      obj[header] = value;
    });

    return {
      id: obj.id ? parseInt(obj.id, 10) : idx + 1,
      name: obj.name || '',
      role: obj.role || '',
      company: obj.company || '',
      cat: obj.cat || 'Tech',
      location: obj.location || '',
      email: obj.email || '',
      phone: obj.phone || '',
      linkedin: obj.linkedin || '',
      instagram: obj.instagram || '',
      twitter: obj.twitter || '',
      github: obj.github || '',
      verified: obj.verified === 'true' || obj.verified === 'TRUE' || obj.verified === 'yes' || obj.verified === '1' || obj.verified === 'True',
      bio: obj.bio || '',
    } as Founder;
  }).filter(f => f.name.trim() !== ''); // only include rows that have a valid name
}

/**
 * Fetches CSV data from a published Google Sheet and parses it.
 */
export async function fetchFoundersFromGoogleSheet(sheetUrl: string): Promise<Founder[]> {
  try {
    const res = await fetch(sheetUrl, {
      cache: 'no-store', // Always fetch fresh data from Google Sheets
    });
    if (!res.ok) throw new Error(`Failed to fetch Google Sheet data: ${res.statusText}`);
    const csvText = await res.text();
    return parseCSV(csvText);
  } catch (error) {
    console.error('Error fetching/parsing founders from Google Sheet:', error);
    throw error;
  }
}
