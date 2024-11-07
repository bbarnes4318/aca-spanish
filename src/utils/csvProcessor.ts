import { promises as fs } from 'fs';
import { parse } from 'csv-parse';
import { submitLead } from './leadSubmission';

interface Prospect {
  phone: string;
  // Add other fields as needed
}

export async function processCsv(filePath: string): Promise<void> {
  const fileContent = await fs.readFile(filePath, 'utf-8');
  
  parse(fileContent, {
    columns: true,
    skip_empty_lines: true
  }, async (err, records: Prospect[]) => {
    if (err) {
      console.error('Error parsing CSV:', err);
      return;
    }

    for (const record of records) {
      try {
        // Wait for LeadiD token to be generated
        const leadidToken = await waitForLeadiDToken();
        
        // Submit the lead with the generated LeadiD
        await submitProspect({
          ...record,
          leadidToken
        });
        
        // Add delay between submissions to prevent rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error('Error processing record:', error);
      }
    }
  });
}

function waitForLeadiDToken(): Promise<string> {
  return new Promise((resolve) => {
    const checkToken = () => {
      const token = document.getElementById('leadid_token')?.getAttribute('value');
      if (token) {
        resolve(token);
      } else {
        setTimeout(checkToken, 100);
      }
    };
    checkToken();
  });
}

async function submitProspect(prospect: Prospect & { leadidToken: string }): Promise<void> {
  try {
    await submitLead({
      phone: prospect.phone,
      leadid_token: prospect.leadidToken,
      tcpa_consent: true
    });
    console.log('Successfully processed prospect:', prospect.phone);
  } catch (error) {
    throw new Error(`Failed to submit prospect: ${error.message}`);
  }
}