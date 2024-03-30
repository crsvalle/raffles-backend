\c raffles_dev;

INSERT INTO raffles (name, secret_token) VALUES 
    ('Vacation Raffle', 's3cr3tT0k3n1'),
    ('Holiday Raffle', 'test'),
    ('Random Raffle', '32231');

INSERT INTO participants (raffle_id, first_name, last_name, email, phone) VALUES 
    (1, 'George', 'Smith', 'georgesmith@gmail.com', '111111111'),
    (1, 'Nicolas', 'Cage', 'NicolasCage@gmail.com', '9876543210'),
    (2, 'Bobby', 'Johnson', 'bob@gmail.com', '5551234567'),
    (3, 'Emily', 'Davis', 'emilyd@gmail.com', '9879879870');