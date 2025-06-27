--| tenant |----------------------------------------------->
SELECT * FROM tenants WHERE id = 1;

UPDATE tenants
SET
    company_name = 'abcCompany',
    email = 'abc@gmail.com',
    website = 'https://example.com',
    company_description = 'lorem ipusm dollar esh rhuth ghuthor',
    email_notification = 0,
    weekly_reports = 0
WHERE
    tenants.id = 1;

INSERT INTO
    tenants (
        company_name,
        company_description,
        email,
        website
    )
VALUES (
        'wipro',
        'service company',
        'wipro@careers',
        'www.wipro.com'
    );

DELETE FROM tenants WHERE id = 3;

--| chatbot |-------------------------------->
SELECT * FROM chatbots WHERE tenant_id = 1;

INSERT INTO
    chatbots (tenant_id, name)
VALUES (4, 'afi-sky-scrapper');

UPDATE chatbots
SET
    name = 'AI SUPPORT BOT',
    avatar_url = 'https://i.imgur.com/ej4SDYh.jpeg',
    color = '#23a8fa',
    status = 'ACTIVE',
    display_order = 0,
    welcome_message = 'Hi, how can i help you today',
    fallback_message = 'Sorry, can answer you with that.'
WHERE
    id = 7;

DELETE FROM chatbots WHERE id = 8;

--| conversation |--------------------------------->
SELECT * FROM conversations WHERE chatbot_id = 8;

INSERT INTO
    conversations (chatbot_id, message, response)
VALUES (
        8,
        'what is the return policy',
        '30 days return back guarentee.'
    );

--| faqs |------------------------------------------>
SELECT * FROM faqs WHERE chatbot_id = 1;

INSERT INTO
    faqs (
        chatbot_id,
        question,
        answer,
        category
    )
VALUES (
        8,
        'What are the return policies',
        'we accept 30 days of return policies',
        'returns'
    );

UPDATE faqs
SET
    question = 'What is the updated return policies',
    answer = 'we offer 30day money back challenge',
    category = 'money back'
WHERE
    id = 3;

DELETE from faqs WHERE id = 11

-- CREATE TABLE `tenants` (
--     `id` INT NOT NULL AUTO_INCREMENT,
--     `company_name` VARCHAR(255) NOT NULL,
--     `email` VARCHAR(255) DEFAULT NULL,
--     `website` VARCHAR(255) DEFAULT NULL,
--     `company_description` TEXT,
--     `email_notification` TINYINT(1) DEFAULT 0,
--     `weekly_reports` TINYINT(1) DEFAULT 0,
--     `last_update` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
--     PRIMARY KEY (`id`),
--     UNIQUE KEY `email` (`email`)
-- );

-- CREATE TABLE `chatbots` (
--     `id` INT NOT NULL AUTO_INCREMENT,
--     `tenant_id` INT NOT NULL,
--     `name` VARCHAR(255) NOT NULL,
--     `welcome_message` VARCHAR(255) DEFAULT 'Hi, how can I help you today.',
--     `avatar_url` VARCHAR(255) DEFAULT 'https://imgur.com/Wa5wd32',
--     `color` VARCHAR(50) DEFAULT '#23a8fa',
--     `status` ENUM('ACTIVE', 'INACTIVE', 'DISABLED') DEFAULT 'ACTIVE',
--     `fallback_message` TEXT,
--     `fallback` TINYINT(1) DEFAULT 0,
--     `display_order` INT DEFAULT 0,
--     `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
--     `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     PRIMARY KEY (`id`),
--     KEY `tenant_id` (`tenant_id`),
--     CONSTRAINT `chatbots_ibfk_1` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE
-- );

-- CREATE TABLE `faqs` (
--     `id` INT NOT NULL AUTO_INCREMENT,
--     `chatbot_id` INT NOT NULL,
--     `question` TEXT NOT NULL,
--     `answer` TEXT NOT NULL,
--     `category` VARCHAR(255) DEFAULT NULL,
--     `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
--     `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     PRIMARY KEY (`id`),
--     KEY `chatbot_id` (`chatbot_id`),
--     CONSTRAINT `faqs_ibfk_1` FOREIGN KEY (`chatbot_id`) REFERENCES `chatbots` (`id`) ON DELETE CASCADE
-- );

-- CREATE TABLE `conversations` (
--     `id` INT NOT NULL AUTO_INCREMENT,
--     `chatbot_id` INT NOT NULL,
--     `message` TEXT NOT NULL,
--     `response` TEXT,
--     `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
--     PRIMARY KEY (`id`),
--     KEY `chatbot_id` (`chatbot_id`),
--     CONSTRAINT `conversations_ibfk_1` FOREIGN KEY (`chatbot_id`) REFERENCES `chatbots` (`id`) ON DELETE CASCADE
-- );