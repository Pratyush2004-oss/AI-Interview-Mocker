import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const MockInterview = pgTable("mockInterview",{
    id:serial("id").primaryKey(),
    jsonMockResp: text("jsonMockResp").notNull(),
    jobExperience: varchar('jobExperiience').notNull(),
    jobPosition: varchar("jobPosition").notNull(),
    jobDesc: varchar("jobDesc").notNull(),
    createdBy: varchar("CreatedBy").notNull(),
    createdAt: varchar("CreatedAt"),
    mockId: varchar("mockId").notNull(),
})

export const UserAnswer = pgTable('userAnswer',{
    id:serial("id").primaryKey(),
    mockIdRef: varchar("mockIdRef").notNull(),
    question: varchar("question").notNull(),
    correctAnswer : text('correctAnswer').notNull(),
    userAnswer : text('userAnswer').notNull(),
    feedback: text('feedback').notNull(),
    rating: varchar('rating').notNull(),
    userEmail: varchar('UserEmail'),
    createdAt: varchar("CreatedAt"),
})