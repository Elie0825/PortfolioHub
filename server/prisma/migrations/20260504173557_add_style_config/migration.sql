-- AlterTable
ALTER TABLE "portfolios" ADD COLUMN     "section_order" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "style_config" JSONB NOT NULL DEFAULT '{}';
