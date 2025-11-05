// Modelo de transação financeira (Back 5 - Helen)
const financialTransactionSchema = {
  id: "uuid",
  type: "enum (income, expense)",
  category: "string",
  amount: "decimal",
  description: "string",
  date: "date",
  client_id: "uuid (foreign key, nullable)",
  created_at: "timestamp",
  updated_at: "timestamp",
}

module.exports = { financialTransactionSchema }
