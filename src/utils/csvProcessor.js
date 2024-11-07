import { parse } from 'csv-parse';
import { Lead } from '../models/Lead.js';
import fs from 'fs';

export const processCsvFile = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    
    fs.createReadStream(filePath)
      .pipe(parse({
        columns: true,
        skip_empty_lines: true
      }))
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        try {
          for (const record of results) {
            await Lead.create({
              phone: record.phone,
              leadid_token: record.leadid_token,
              tcpa_consent: true
            });
          }
          resolve(results.length);
        } catch (error) {
          reject(error);
        }
      })
      .on('error', (error) => reject(error));
  });
};