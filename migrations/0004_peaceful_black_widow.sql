DROP INDEX IF EXISTS `user_username_unique`;--> statement-breakpoint
ALTER TABLE `user` ADD `email` text;--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);