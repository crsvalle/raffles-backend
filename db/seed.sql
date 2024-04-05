\c raffles_dev;

INSERT INTO raffles (name, secret_token, ended, winner_id, created_at) VALUES 
    ('Vacation Raffle', 's3cr3tT0k3n1', FALSE, NULL, CURRENT_TIMESTAMP),
    ('Holiday Raffle', 'test', FALSE, NULL, CURRENT_TIMESTAMP),
    ('Random Raffle', '32231', FALSE, NULL, CURRENT_TIMESTAMP);

INSERT INTO participants (raffle_id, first_name, last_name, email, phone, created_at) VALUES 
    (1, 'George', 'Smith', 'georgesmith@gmail.com', '111111111', CURRENT_TIMESTAMP),
    (1, 'Nicolas', 'Cage', 'NicolasCage@gmail.com', '9876543210', CURRENT_TIMESTAMP),
    (2, 'Bobby', 'Johnson', 'bob@gmail.com', '5551234567', CURRENT_TIMESTAMP),
    (3, 'Emily', 'Davis', 'emilyd@gmail.com', '9879879870', CURRENT_TIMESTAMP);