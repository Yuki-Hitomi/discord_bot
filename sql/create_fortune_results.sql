CREATE TABLE fortune_results (
    id INTEGER PRIMARY KEY,
    user_id TEXT UNIQUE,
    fortune_id INTEGER,
    color_code TEXT,
    created_at TEXT,
    updated_at TEXT,
    delete_flg INTEGER DEFAULT 0
);

CREATE TRIGGER set_created_at_and_updated_at
AFTER INSERT ON fortune_results
FOR EACH ROW
BEGIN
    UPDATE fortune_results
    SET created_at = datetime('now', 'localtime'),
        updated_at = datetime('now', 'localtime')
    WHERE id = NEW.id;
END;

CREATE TRIGGER set_updated_at
AFTER UPDATE ON fortune_results
FOR EACH ROW
BEGIN
    UPDATE fortune_results
    SET updated_at = datetime('now', 'localtime')
    WHERE id = NEW.id;
END;
