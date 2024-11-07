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
          let processedCount = 0;
          
          for (const record of results) {
            try {
              await Lead.create({
                phone: record.phone,
                leadid_token: record.leadid_token || `LEAD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                tcpa_consent: true,
                timestamp: new Date()
              });
              processedCount++;
            } catch (err) {
              console.error(`Error processing record: ${err.message}`);
            }
          }
          
          resolve(processedCount);
        } catch (error) {
          reject(error);
        }
      })
      .on('error', (error) => reject(error));
  });
};