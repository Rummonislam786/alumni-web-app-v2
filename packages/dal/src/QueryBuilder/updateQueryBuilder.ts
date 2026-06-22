export function buildUpdateQuery(
  table: string,
  data: Record<string, any>,
  where: { column: string; value: any }
) {
  const setClauses: string[] = [];
  const values: any[] = [];

  let index = 1;

  for (const key in data) {
    setClauses.push(`${key} = $${index++}`);
    values.push(data[key]);
  }

  values.push(where.value);

  const query = `
    UPDATE ${table}
    SET ${setClauses.join(', ')}
    WHERE ${where.column} = $${index}
    RETURNING *;
  `;

  return { query, values };
}
