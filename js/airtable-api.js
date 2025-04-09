// Airtable API wrapper for AIHUB-STATION

class AirtableAPI {
    constructor(apiKey, baseId) {
        this.apiKey = apiKey;
        this.baseId = baseId;
        this.baseUrl = `https://api.airtable.com/v0/${baseId}`;
        this.headers = {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        };
    }

    // Create a record in a table
    async createRecord(tableName, fields) {
        try {
            const response = await fetch(`${this.baseUrl}/${tableName}`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({ fields })
            });

            if (!response.ok) {
                throw new Error(`Error creating record: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Airtable API Error:', error);
            throw error;
        }
    }

    // Get records from a table
    async getRecords(tableName, options = {}) {
        try {
            let url = `${this.baseUrl}/${tableName}`;
            
            // Add query parameters if provided
            if (Object.keys(options).length > 0) {
                const params = new URLSearchParams();
                
                if (options.maxRecords) {
                    params.append('maxRecords', options.maxRecords);
                }
                
                if (options.view) {
                    params.append('view', options.view);
                }
                
                if (options.filterByFormula) {
                    params.append('filterByFormula', options.filterByFormula);
                }
                
                if (options.sort) {
                    params.append('sort', JSON.stringify(options.sort));
                }
                
                url += `?${params.toString()}`;
            }
            
            const response = await fetch(url, {
                method: 'GET',
                headers: this.headers
            });

            if (!response.ok) {
                throw new Error(`Error fetching records: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Airtable API Error:', error);
            throw error;
        }
    }

    // Update a record in a table
    async updateRecord(tableName, recordId, fields) {
        try {
            const response = await fetch(`${this.baseUrl}/${tableName}/${recordId}`, {
                method: 'PATCH',
                headers: this.headers,
                body: JSON.stringify({ fields })
            });

            if (!response.ok) {
                throw new Error(`Error updating record: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Airtable API Error:', error);
            throw error;
        }
    }

    // Delete a record from a table
    async deleteRecord(tableName, recordId) {
        try {
            const response = await fetch(`${this.baseUrl}/${tableName}/${recordId}`, {
                method: 'DELETE',
                headers: this.headers
            });

            if (!response.ok) {
                throw new Error(`Error deleting record: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Airtable API Error:', error);
            throw error;
        }
    }
}
