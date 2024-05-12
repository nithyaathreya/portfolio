import { db } from "./database";

export const runMigratins = () => {
  db.serialize(() => {
    db.run(
      `
      CREATE TABLE IF NOT EXISTS articles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        imageUrl TEXT NOT NULL,
        articleUrl TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL
      );
    `,
      (err: Error) => {
        if (err) {
          console.error(err.message);
        }
        console.log("articles table created successfully.");
      }
    );
    db.run(
      `
      CREATE TABLE IF NOT EXISTS case_studies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        body TEXT NOT NULL,
        slug TEXT NOT NULL
      );
    `,
      (err: Error) => {
        if (err) {
          console.error(err.message);
        }
        console.log("case_studies table created successfully.");
      }
    );
    db.run(
      `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        emailId TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      );
    `,
      (err: Error) => {
        if (err) {
          console.error(err.message);
        }
        console.log("users table created successfully.");
      }
    );
    db.run(
      `
      CREATE TABLE IF NOT EXISTS home (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        greeting TEXT NOT NULL,
        imageUrl TEXT NOT NULL,
        quote TEXT NOT NULL,
        about TEXT NOT NULL
      );
    `,
      (err: Error) => {
        if (err) {
          console.error(err.message);
        }
        console.log("home table created successfully.");
      }
    );
    db.run(
      `
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        techStack BLOB NOT NULL,
        imageUrl TEXT NOT NULL
      );
    `,
      (err: Error) => {
        if (err) {
          console.error(err.message);
        }
        console.log("projects table created successfully.");
      }
    );
    db.run(
      `
      CREATE TABLE IF NOT EXISTS introduction (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        imageUrl TEXT NOT NULL,
        email BLOB NOT NULL,
        phone TEXT NOT NULL,
        dob TEXT NOT NULL,
        location TEXT NOT NULL
      );
    `,
      (err: Error) => {
        if (err) {
          console.error(err.message);
        }
        console.log("projects table created successfully.");
      }
    );
  });
}
