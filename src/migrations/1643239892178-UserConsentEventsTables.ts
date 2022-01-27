import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserConsentEventsTables1643239892178
  implements MigrationInterface
{
  name = 'UserConsentEventsTables1643239892178';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."consent_events_consent_name_enum" AS ENUM('email_notifications', 'sms_notifications', 'no_notifications', 'all_notifications')`,
    );
    await queryRunner.query(
      `CREATE TABLE "consent_events" ("id" BIGSERIAL NOT NULL, "consent_name" "public"."consent_events_consent_name_enum" NOT NULL, "enabled" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_40ecc066035b8a4e5a6dcdfb46e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."consent_consent_name_enum" AS ENUM('email_notifications', 'sms_notifications', 'no_notifications', 'all_notifications')`,
    );
    await queryRunner.query(
      `CREATE TABLE "consent" ("id" BIGSERIAL NOT NULL, "consent_name" "public"."consent_consent_name_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "consentEventId" bigint, CONSTRAINT "PK_9115e8d6b082d4fc46d56134d29" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "consent_events" ADD CONSTRAINT "FK_a00b8a97158096efa24ffc0521d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "consent" ADD CONSTRAINT "FK_e75db518fa3b7ea68708bc91e65" FOREIGN KEY ("consentEventId") REFERENCES "consent_events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "consent" DROP CONSTRAINT "FK_e75db518fa3b7ea68708bc91e65"`,
    );
    await queryRunner.query(
      `ALTER TABLE "consent_events" DROP CONSTRAINT "FK_a00b8a97158096efa24ffc0521d"`,
    );
    await queryRunner.query(`DROP TABLE "consent"`);
    await queryRunner.query(`DROP TYPE "public"."consent_consent_name_enum"`);
    await queryRunner.query(`DROP TABLE "consent_events"`);
    await queryRunner.query(
      `DROP TYPE "public"."consent_events_consent_name_enum"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
