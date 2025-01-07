import { pgSchema, index, foreignKey, unique, uuid, timestamp, varchar, date, uniqueIndex, boolean, integer, jsonb, text, pgEnum } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const core = pgSchema("core");
export const contacts = pgSchema("contacts");
export const cms = pgSchema("cms");
export const media = pgSchema("media");
export const mail = pgSchema("mail");
export const sitebuilderV1 = pgSchema("sitebuilder_v1");
export const relationships = pgSchema("relationships");
export const cmsRowsFieldAppearance = cms.enum("rows_field_appearance", ['DATE_TIME', 'SINGLE_SELECT', 'MULTI_SELECT', 'CURRENCY', 'CHECKBOX', 'SWITCH', 'TEXT', 'TEXTAREA', 'NUMBER', 'SLUG', 'URL', 'JSON', 'CODE', 'EMAIL', 'PHONE'])
export const cmsRowsFieldType = cms.enum("rows_field_type", ['NUMBER', 'STRING', 'BOOLEAN', 'DATE'])
export const cmsRowsValidatorType = cms.enum("rows_validator_type", ['MIN', 'MAX', 'MIN_LENGTH', 'MAX_LENGTH', 'REQUIRED', 'REGEX'])
export const cmsRowsValueType = cms.enum("rows_value_type", ['VALUE', 'PREDEFINED_VALUE', 'DEFAULT_VALUE'])
export const contactsContactsFieldAppearance = contacts.enum("contacts_field_appearance", ['DATE_TIME', 'SINGLE_SELECT', 'MULTI_SELECT', 'CURRENCY', 'CHECKBOX', 'SWITCH', 'TEXT', 'TEXTAREA', 'NUMBER', 'SLUG', 'URL', 'JSON', 'CODE', 'EMAIL', 'PHONE'])
export const contactsContactsFieldType = contacts.enum("contacts_field_type", ['NUMBER', 'STRING', 'BOOLEAN', 'DATE'])
export const contactsContactsValidatorType = contacts.enum("contacts_validator_type", ['MIN', 'MAX', 'MIN_LENGTH', 'MAX_LENGTH', 'REQUIRED', 'REGEX'])
export const contactsContactsValueType = contacts.enum("contacts_value_type", ['VALUE', 'PREDEFINED_VALUE', 'DEFAULT_VALUE'])
export const coreBillingInterval = core.enum("billing_interval", ['free', 'month', 'year', 'week'])
export const corePlanQuotaTypeEnum = core.enum("plan_quota_type_enum", ['OVERAGE', 'RESTRICT'])
export const coreSettingsValueType = core.enum("settings_value_type", ['STRING', 'NUMBER', 'JSON', 'BOOLEAN', 'UUID'])
export const coreStripeEventStausEnum = core.enum("stripe_event_staus_enum", ['PROCESSING', 'PROCESSED', 'ERROR'])
export const coreSubscriptionStatusEnum = core.enum("subscription_status_enum", ['incomplete', 'incomplete_expired', 'trialing', 'active', 'past_due', 'canceled', 'unpaid', 'paused'])
export const coreUserPrefferedThemeEnum = core.enum("user_preffered_theme_enum", ['dark', 'light', 'system'])
export const coreViewLevel = core.enum("view_level", ['PERSONAL', 'WORKSPACE'])
export const coreWorkspaceInviteStatus = core.enum("workspace_invite_status", ['ACCEPTED', 'PENDING', 'REJECTED'])
export const coreWorkspaceUsersType = core.enum("workspace_users_type", ['MEMBER', 'TENANT'])
export const mediaFormatsSystemEnum = media.enum("formatsSystemEnum", ['SYSTEM_THUMBNAIL', 'ORIGINAL', 'USERS_GENERATED'])
export const mediaFormatsTypeEnum = media.enum("formatsTypeEnum", ['WIDTH', 'HEIGHT', 'BOTH'])
export const workspaceInviteStatus = pgEnum("workspace_invite_status", ['ACCEPTED', 'PENDING', 'REJECTED'])
export const sitebuilderV1EntityType = sitebuilderV1.enum("entity_type", ['PAGE', 'COMPONENT'])



export const coreUserProfiles = core.table("user_profiles", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	userId: uuid("user_id").notNull(),
	email: varchar("email", { length: 255 }),
	name: varchar("name", { length: 255 }),
	imageUrl: varchar("image_url"),
	phone: varchar("phone", { length: 20 }),
	location: varchar("location", { length: 255 }),
	jobTitle: varchar("job_title", { length: 255 }),
	birthday: date("birthday"),
},
(table) => {
	return {
		userIdIdx: index("user_id_idx").using("btree", table.userId.asc().nullsLast()),
		userProfilesUserIdUsersIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [coreUsers.id],
			name: "user_profiles_user_id_users_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
		userProfilesUserIdUnique: unique("user_profiles_user_id_unique").on(table.userId),
	}
});

export const coreChannels = core.table("channels", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdById: uuid("created_by_id").notNull(),
	workspaceId: uuid("workspace_id").notNull(),
	name: varchar("name", { length: 50 }).notNull(),
	color: varchar("color", { length: 50 }).notNull(),
},
(table) => {
	return {
		channelsCreatedByIdUsersIdFk: foreignKey({
			columns: [table.createdById],
			foreignColumns: [coreUsers.id],
			name: "channels_created_by_id_users_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
		channelsWorkspaceIdWorkspacesIdFk: foreignKey({
			columns: [table.workspaceId],
			foreignColumns: [coreWorkspaces.id],
			name: "channels_workspace_id_workspaces_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const coreWorkspaceCurrencies = core.table("workspace_currencies", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdById: uuid("created_by_id").notNull(),
	workspaceId: uuid("workspace_id").notNull(),
	currencyId: uuid("currency_id").notNull(),
	isDefault: boolean("is_default").default(false).notNull(),
},
(table) => {
	return {
		uniqueWorkspaceCurrency: uniqueIndex("unique_workspace_currency").using("btree", table.workspaceId.asc().nullsLast(), table.currencyId.asc().nullsLast()),
		workspaceCurrenciesCreatedByIdUsersIdFk: foreignKey({
			columns: [table.createdById],
			foreignColumns: [coreUsers.id],
			name: "workspace_currencies_created_by_id_users_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
		workspaceCurrenciesCurrencyIdCurrenciesIdFk: foreignKey({
			columns: [table.currencyId],
			foreignColumns: [coreCurrencies.id],
			name: "workspace_currencies_currency_id_currencies_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
		workspaceCurrenciesWorkspaceIdWorkspacesIdFk: foreignKey({
			columns: [table.workspaceId],
			foreignColumns: [coreWorkspaces.id],
			name: "workspace_currencies_workspace_id_workspaces_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const contactsContacts = contacts.table("contacts", {
	folio: integer("folio").notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	email: varchar("email", { length: 255 }),
	phone: varchar("phone", { length: 30 }),
	typeId: uuid("type_id"),
	workspaceId: uuid("workspace_id").notNull(),
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
},
(table) => {
	return {
		uniqueFolio: uniqueIndex("unique_folio").using("btree", table.workspaceId.asc().nullsLast(), table.folio.asc().nullsLast()),
		contactsTypeIdContactsTypesIdFk: foreignKey({
			columns: [table.typeId],
			foreignColumns: [contactsContactsTypes.id],
			name: "contacts_type_id_contacts_types_id_fk"
		}).onUpdate("cascade").onDelete("restrict"),
		contactsWorkspaceIdWorkspacesIdFk: foreignKey({
			columns: [table.workspaceId],
			foreignColumns: [coreWorkspaces.id],
			name: "contacts_workspace_id_workspaces_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const contactsContactsTypes = contacts.table("contacts_types", {
	name: varchar("name", { length: 255 }).notNull(),
	workspaceId: uuid("workspace_id").notNull(),
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	description: varchar("description", { length: 255 }),
	config: jsonb("config"),
},
(table) => {
	return {
		uniqueType: uniqueIndex("unique_type").using("btree", table.workspaceId.asc().nullsLast(), table.name.asc().nullsLast()),
		contactsTypesWorkspaceIdWorkspacesIdFk: foreignKey({
			columns: [table.workspaceId],
			foreignColumns: [coreWorkspaces.id],
			name: "contacts_types_workspace_id_workspaces_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const cmsRowsTypes = cms.table("rows_types", {
	slug: varchar("slug", { length: 255 }).notNull(),
	description: varchar("description", { length: 255 }),
	spaceId: uuid("space_id").notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	config: jsonb("config"),
	workspaceId: uuid("workspace_id").notNull(),
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
},
(table) => {
	return {
		uniqueType: uniqueIndex("unique_type").using("btree", table.workspaceId.asc().nullsLast(), table.name.asc().nullsLast()),
		uniqueTypeName: uniqueIndex("unique_type_name").using("btree", table.workspaceId.asc().nullsLast(), table.name.asc().nullsLast(), table.spaceId.asc().nullsLast()),
		uniqueTypeSlug: uniqueIndex("unique_type_slug").using("btree", table.workspaceId.asc().nullsLast(), table.slug.asc().nullsLast(), table.spaceId.asc().nullsLast()),
		rowsTypesSpaceIdSpacesIdFk: foreignKey({
			columns: [table.spaceId],
			foreignColumns: [cmsSpaces.id],
			name: "rows_types_space_id_spaces_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
		rowsTypesWorkspaceIdWorkspacesIdFk: foreignKey({
			columns: [table.workspaceId],
			foreignColumns: [coreWorkspaces.id],
			name: "rows_types_workspace_id_workspaces_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const cmsSpaces = cms.table("spaces", {
	workspaceId: uuid("workspace_id").notNull(),
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	slug: varchar("slug", { length: 255 }).notNull(),
	description: text("description"),
},
(table) => {
	return {
		uniqueSpaceSlug: uniqueIndex("unique_space_slug").using("btree", table.slug.asc().nullsLast(), table.workspaceId.asc().nullsLast()),
		spacesWorkspaceIdWorkspacesIdFk: foreignKey({
			columns: [table.workspaceId],
			foreignColumns: [coreWorkspaces.id],
			name: "spaces_workspace_id_workspaces_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const cmsRowsValidators = cms.table("rows_validators", {
	fieldId: uuid("field_id").notNull(),
	type: cmsRowsValidatorType("type").notNull(),
	value: varchar("value", { length: 1024 }).notNull(),
	message: varchar("message", { length: 255 }),
	workspaceId: uuid("workspace_id").notNull(),
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
},
(table) => {
	return {
		rowsValidatorsFieldIdRowsFieldsIdFk: foreignKey({
			columns: [table.fieldId],
			foreignColumns: [cmsRowsFields.id],
			name: "rows_validators_field_id_rows_fields_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
		rowsValidatorsWorkspaceIdWorkspacesIdFk: foreignKey({
			columns: [table.workspaceId],
			foreignColumns: [coreWorkspaces.id],
			name: "rows_validators_workspace_id_workspaces_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const cmsRowsValues = cms.table("rows_values", {
	fieldId: uuid("field_id").notNull(),
	rowId: uuid("row_id"),
	value: text("value"),
	type: cmsRowsValueType("type").default('VALUE').notNull(),
	index: integer("index").default(0).notNull(),
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
},
(table) => {
	return {
		uniqueValuePerRow: uniqueIndex("unique_value_per_row").using("btree", table.fieldId.asc().nullsLast(), table.rowId.asc().nullsLast(), table.index.asc().nullsLast()),
		rowsValuesFieldIdRowsFieldsIdFk: foreignKey({
			columns: [table.fieldId],
			foreignColumns: [cmsRowsFields.id],
			name: "rows_values_field_id_rows_fields_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
		rowsValuesRowIdRowsIdFk: foreignKey({
			columns: [table.rowId],
			foreignColumns: [cmsRows.id],
			name: "rows_values_row_id_rows_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const contactsTagToContact = contacts.table("tag_to_contact", {
	contactId: uuid("contact_id"),
	tagId: uuid("tag_id"),
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
},
(table) => {
	return {
		uniqeTagToContact: uniqueIndex("uniqe_tag_to_contact").using("btree", table.contactId.asc().nullsLast(), table.tagId.asc().nullsLast()),
		tagToContactContactIdContactsIdFk: foreignKey({
			columns: [table.contactId],
			foreignColumns: [contactsContacts.id],
			name: "tag_to_contact_contact_id_contacts_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
		tagToContactTagIdTagsIdFk: foreignKey({
			columns: [table.tagId],
			foreignColumns: [contactsTags.id],
			name: "tag_to_contact_tag_id_tags_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const contactsTagToContactType = contacts.table("tag_to_contact_type", {
	fieldId: uuid("field_id"),
	typeId: uuid("type_id"),
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
},
(table) => {
	return {
		tagToContactTypeFieldIdContactsFieldsIdFk: foreignKey({
			columns: [table.fieldId],
			foreignColumns: [contactsContactsFields.id],
			name: "tag_to_contact_type_field_id_contacts_fields_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
		tagToContactTypeTypeIdContactsTypesIdFk: foreignKey({
			columns: [table.typeId],
			foreignColumns: [contactsContactsTypes.id],
			name: "tag_to_contact_type_type_id_contacts_types_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
		uniqueTagToField: unique("unique_tag_to_field").on(table.fieldId, table.typeId),
	}
});

export const contactsContactsValidators = contacts.table("contacts_validators", {
	fieldId: uuid("field_id").notNull(),
	type: contactsContactsValidatorType("type").notNull(),
	value: varchar("value", { length: 1024 }).notNull(),
	message: varchar("message", { length: 255 }),
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	workspaceId: uuid("workspace_id").notNull(),
},
(table) => {
	return {
		contactsValidatorsFieldIdContactsFieldsIdFk: foreignKey({
			columns: [table.fieldId],
			foreignColumns: [contactsContactsFields.id],
			name: "contacts_validators_field_id_contacts_fields_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
		contactsValidatorsWorkspaceIdWorkspacesIdFk: foreignKey({
			columns: [table.workspaceId],
			foreignColumns: [coreWorkspaces.id],
			name: "contacts_validators_workspace_id_workspaces_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const cmsRowsFields = cms.table("rows_fields", {
	name: varchar("name", { length: 255 }).notNull(),
	slug: varchar("slug", { length: 255 }).notNull(),
	description: varchar("description", { length: 255 }),
	label: varchar("label", { length: 255 }),
	help: varchar("help", { length: 255 }),
	dataType: cmsRowsFieldType("data_type").default('STRING').notNull(),
	appearance: cmsRowsFieldAppearance("appearance").default('TEXT').notNull(),
	isMultiValue: boolean("is_multi_value").default(false).notNull(),
	placeholder: varchar("placeholder", { length: 255 }),
	metadata: jsonb("metadata"),
	workspaceId: uuid("workspace_id").notNull(),
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	typeId: uuid("type_id").notNull(),
	index: integer("index").default(0).notNull(),
},
(table) => {
	return {
		rowsFieldsTypeIdRowsTypesIdFk: foreignKey({
			columns: [table.typeId],
			foreignColumns: [cmsRowsTypes.id],
			name: "rows_fields_type_id_rows_types_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
		rowsFieldsWorkspaceIdWorkspacesIdFk: foreignKey({
			columns: [table.workspaceId],
			foreignColumns: [coreWorkspaces.id],
			name: "rows_fields_workspace_id_workspaces_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const contactsContactsFields = contacts.table("contacts_fields", {
	name: varchar("name", { length: 255 }).notNull(),
	slug: varchar("slug", { length: 255 }).notNull(),
	description: varchar("description", { length: 255 }),
	label: varchar("label", { length: 255 }),
	help: varchar("help", { length: 255 }),
	dataType: contactsContactsFieldType("data_type").default('STRING').notNull(),
	workspaceId: uuid("workspace_id").notNull(),
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	appearance: contactsContactsFieldAppearance("appearance").default('TEXT').notNull(),
	isMultiValue: boolean("is_multi_value").default(false).notNull(),
	metadata: jsonb("metadata"),
	placeholder: varchar("placeholder", { length: 255 }),
},
(table) => {
	return {
		contactsFieldsWorkspaceIdWorkspacesIdFk: foreignKey({
			columns: [table.workspaceId],
			foreignColumns: [coreWorkspaces.id],
			name: "contacts_fields_workspace_id_workspaces_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const cmsRows = cms.table("rows", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	workspaceId: uuid("workspace_id").notNull(),
	publishedAt: timestamp("published_at", { withTimezone: true, mode: 'string' }),
	deletedAt: timestamp("deleted_at", { withTimezone: true, mode: 'string' }),
	typeId: uuid("type_id"),
	folio: integer("folio").notNull(),
},
(table) => {
	return {
		uniqueRowFolio: uniqueIndex("unique_row_folio").using("btree", table.folio.asc().nullsLast(), table.workspaceId.asc().nullsLast(), table.typeId.asc().nullsLast()),
		rowsTypeIdRowsTypesIdFk: foreignKey({
			columns: [table.typeId],
			foreignColumns: [cmsRowsTypes.id],
			name: "rows_type_id_rows_types_id_fk"
		}).onUpdate("cascade").onDelete("restrict"),
		rowsWorkspaceIdWorkspacesIdFk: foreignKey({
			columns: [table.workspaceId],
			foreignColumns: [coreWorkspaces.id],
			name: "rows_workspace_id_workspaces_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const contactsContactsValues = contacts.table("contacts_values", {
	fieldId: uuid("field_id").notNull(),
	rowId: uuid("row_id"),
	value: text("value"),
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	type: contactsContactsValueType("type").default('VALUE').notNull(),
	index: integer("index").default(0).notNull(),
},
(table) => {
	return {
		uniqueValuePerRow: uniqueIndex("unique_value_per_row").using("btree", table.fieldId.asc().nullsLast(), table.rowId.asc().nullsLast()),
		contactsValuesFieldIdContactsFieldsIdFk: foreignKey({
			columns: [table.fieldId],
			foreignColumns: [contactsContactsFields.id],
			name: "contacts_values_field_id_contacts_fields_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
		contactsValuesRowIdContactsIdFk: foreignKey({
			columns: [table.rowId],
			foreignColumns: [contactsContacts.id],
			name: "contacts_values_row_id_contacts_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const mediaFormats = media.table("formats", {
	workspaceId: uuid("workspace_id"),
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdById: uuid("created_by_id"),
	name: varchar("name", { length: 255 }).notNull(),
	value: integer("value").notNull(),
	type: mediaFormatsTypeEnum("type").notNull(),
	deletedAt: timestamp("deleted_at", { withTimezone: true, mode: 'string' }),
	extension: varchar("extension"),
	quality: integer("quality").default(75).notNull(),
	system: mediaFormatsSystemEnum("system").default('USERS_GENERATED'),
	description: varchar("description", { length: 255 }),
},
(table) => {
	return {
		uniqueName: uniqueIndex("unique_name").using("btree", table.name.asc().nullsLast(), table.workspaceId.asc().nullsLast()),
		formatsCreatedByIdUsersIdFk: foreignKey({
			columns: [table.createdById],
			foreignColumns: [coreUsers.id],
			name: "formats_created_by_id_users_id_fk"
		}).onUpdate("cascade").onDelete("set null"),
		formatsWorkspaceIdWorkspacesIdFk: foreignKey({
			columns: [table.workspaceId],
			foreignColumns: [coreWorkspaces.id],
			name: "formats_workspace_id_workspaces_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const mediaFileMediaFormats = media.table("file_media_formats", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	fileId: uuid("file_id").notNull(),
	size: integer("size").notNull(),
	width: integer("width").notNull(),
	height: integer("height").notNull(),
	name: varchar("name").notNull(),
	mime: varchar("mime").notNull(),
	key: varchar("key").notNull(),
	formatId: uuid("format_id"),
},
(table) => {
	return {
		uniqueKeyFileFormat: uniqueIndex("unique_key_file_format").using("btree", table.key.asc().nullsLast()),
		fileMediaFormatsFileIdFilesIdFk: foreignKey({
			columns: [table.fileId],
			foreignColumns: [mediaFiles.id],
			name: "file_media_formats_file_id_files_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
		fileMediaFormatsFormatIdFormatsIdFk: foreignKey({
			columns: [table.formatId],
			foreignColumns: [mediaFormats.id],
			name: "file_media_formats_format_id_formats_id_fk"
		}).onUpdate("cascade").onDelete("restrict"),
	}
});

export const mediaFolders = media.table("folders", {
	workspaceId: uuid("workspace_id").notNull(),
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdById: uuid("created_by_id"),
	parentFolderId: uuid("parent_folder_id"),
	name: varchar("name", { length: 255 }).notNull(),
	slug: varchar("slug", { length: 255 }).notNull(),
	deletedAt: timestamp("deleted_at", { withTimezone: true, mode: 'string' }),
},
(table) => {
	return {
		uniqueSlug: uniqueIndex("unique_slug").using("btree", table.slug.asc().nullsLast(), table.workspaceId.asc().nullsLast()),
		foldersCreatedByIdUsersIdFk: foreignKey({
			columns: [table.createdById],
			foreignColumns: [coreUsers.id],
			name: "folders_created_by_id_users_id_fk"
		}).onUpdate("cascade").onDelete("set null"),
		foldersWorkspaceIdWorkspacesIdFk: foreignKey({
			columns: [table.workspaceId],
			foreignColumns: [coreWorkspaces.id],
			name: "folders_workspace_id_workspaces_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
		parentFk: foreignKey({
			columns: [table.parentFolderId],
			foreignColumns: [table.id],
			name: "parent_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const mediaFileToFolder = media.table("file_to_folder", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	folderId: uuid("folder_id"),
	fileId: uuid("file_id").notNull(),
	workspaceId: uuid("workspace_id"),
	deletedAt: timestamp("deleted_at", { withTimezone: true, mode: 'string' }),
},
(table) => {
	return {
		uniqueFile: uniqueIndex("unique_file").using("btree", table.fileId.asc().nullsLast()),
		fileToFolderFileIdFilesIdFk: foreignKey({
			columns: [table.fileId],
			foreignColumns: [mediaFiles.id],
			name: "file_to_folder_file_id_files_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
		fileToFolderFolderIdFoldersIdFk: foreignKey({
			columns: [table.folderId],
			foreignColumns: [mediaFolders.id],
			name: "file_to_folder_folder_id_folders_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
		fileToFolderWorkspaceIdWorkspacesIdFk: foreignKey({
			columns: [table.workspaceId],
			foreignColumns: [coreWorkspaces.id],
			name: "file_to_folder_workspace_id_workspaces_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const mediaFiles = media.table("files", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	workspaceId: uuid("workspace_id"),
	key: varchar("key").notNull(),
	createdById: uuid("created_by_id"),
	mime: varchar("mime").notNull(),
	name: varchar("name").notNull(),
	size: integer("size").notNull(),
},
(table) => {
	return {
		uniqueKeyFile: uniqueIndex("unique_key_file").using("btree", table.key.asc().nullsLast()),
		filesCreatedByIdUsersIdFk: foreignKey({
			columns: [table.createdById],
			foreignColumns: [coreUsers.id],
			name: "files_created_by_id_users_id_fk"
		}).onUpdate("cascade").onDelete("set null"),
		filesWorkspaceIdWorkspacesIdFk: foreignKey({
			columns: [table.workspaceId],
			foreignColumns: [coreWorkspaces.id],
			name: "files_workspace_id_workspaces_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const mailMailboxes = mail.table("mailboxes", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdById: uuid("created_by_id").notNull(),
	workspaceId: uuid("workspace_id").notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	email: varchar("email", { length: 255 }).notNull(),
	enabled: boolean("enabled").default(true).notNull(),
	password: varchar("password", { length: 255 }).notNull(),
},
(table) => {
	return {
		uniqueMailBox: uniqueIndex("unique_mail_box").using("btree", table.workspaceId.asc().nullsLast(), table.name.asc().nullsLast()),
		uniqueMailboxEmail: uniqueIndex("unique_mailbox_email").using("btree", table.email.asc().nullsLast()),
		mailboxesCreatedByIdUsersIdFk: foreignKey({
			columns: [table.createdById],
			foreignColumns: [coreUsers.id],
			name: "mailboxes_created_by_id_users_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
		mailboxesWorkspaceIdWorkspacesIdFk: foreignKey({
			columns: [table.workspaceId],
			foreignColumns: [coreWorkspaces.id],
			name: "mailboxes_workspace_id_workspaces_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const coreQuotaTypes = core.table("quota_types", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	name: varchar("name", { length: 100 }).notNull(),
	unit: varchar("unit", { length: 50 }).notNull(),
	description: text("description"),
	slug: varchar("slug", { length: 100 }).notNull(),
},
(table) => {
	return {
		uniqueSlug: uniqueIndex("unique_slug").using("btree", table.slug.asc().nullsLast()),
		quotaTypesNameUnique: unique("quota_types_name_unique").on(table.name),
		quotaTypesSlugUnique: unique("quota_types_slug_unique").on(table.slug),
	}
});

export const coreRoles = core.table("roles", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	description: varchar("description", { length: 255 }),
	workspaceId: uuid("workspace_id").notNull(),
	isAdministrator: boolean("is_administrator").notNull(),
	defaultJsonConfigKey: varchar("default_json_config_key"),
	canDelete: boolean("can_delete").default(true).notNull(),
	type: coreWorkspaceUsersType("type").default('MEMBER').notNull(),
},
(table) => {
	return {
		rolesWorkspaceIdWorkspacesIdFk: foreignKey({
			columns: [table.workspaceId],
			foreignColumns: [coreWorkspaces.id],
			name: "roles_workspace_id_workspaces_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const corePlanQuotas = core.table("plan_quotas", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	planId: uuid("plan_id").notNull(),
	quotaTypeId: uuid("quota_type_id").notNull(),
	maxValue: integer("max_value").notNull(),
	type: corePlanQuotaTypeEnum("type").default('RESTRICT').notNull(),
	doesReset: boolean("does_reset").default(true).notNull(),
},
(table) => {
	return {
		planQuotasPlanIdPlansIdFk: foreignKey({
			columns: [table.planId],
			foreignColumns: [corePlans.id],
			name: "plan_quotas_plan_id_plans_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
		planQuotasQuotaTypeIdQuotaTypesIdFk: foreignKey({
			columns: [table.quotaTypeId],
			foreignColumns: [coreQuotaTypes.id],
			name: "plan_quotas_quota_type_id_quota_types_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const coreQuotaUsage = core.table("quota_usage", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	workspaceId: uuid("workspace_id").notNull(),
	quotaTypeId: uuid("quota_type_id"),
	usedValue: integer("used_value").default(0).notNull(),
	overageValue: integer("overage_value").default(0).notNull(),
	periodStart: timestamp("period_start", { withTimezone: true, mode: 'string' }).notNull(),
	periodEnd: timestamp("period_end", { withTimezone: true, mode: 'string' }).notNull(),
	lastReported: timestamp("last_reported", { withTimezone: true, mode: 'string' }),
},
(table) => {
	return {
		uniqueUsage: uniqueIndex("unique_usage").using("btree", table.workspaceId.asc().nullsLast(), table.quotaTypeId.asc().nullsLast(), table.periodStart.asc().nullsLast(), table.periodEnd.asc().nullsLast()),
		quotaUsageQuotaTypeIdQuotaTypesIdFk: foreignKey({
			columns: [table.quotaTypeId],
			foreignColumns: [coreQuotaTypes.id],
			name: "quota_usage_quota_type_id_quota_types_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
		quotaUsageWorkspaceIdWorkspacesIdFk: foreignKey({
			columns: [table.workspaceId],
			foreignColumns: [coreWorkspaces.id],
			name: "quota_usage_workspace_id_workspaces_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const corePlanPrices = core.table("plan_prices", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	planId: uuid("plan_id").notNull(),
	billingInterval: coreBillingInterval("billing_interval").notNull(),
	currencyId: uuid("currency_id").notNull(),
	amount: integer("amount").notNull(),
	stripePriceId: varchar("stripe_price_id", { length: 255 }).notNull(),
},
(table) => {
	return {
		stripePriceId: uniqueIndex("stripe_price_id").using("btree", table.stripePriceId.asc().nullsLast()),
		uniqePlan: uniqueIndex("uniqe_plan").using("btree", table.planId.asc().nullsLast(), table.billingInterval.asc().nullsLast(), table.currencyId.asc().nullsLast()),
		planPricesCurrencyIdCurrenciesIdFk: foreignKey({
			columns: [table.currencyId],
			foreignColumns: [coreCurrencies.id],
			name: "plan_prices_currency_id_currencies_id_fk"
		}),
		planPricesPlanIdPlansIdFk: foreignKey({
			columns: [table.planId],
			foreignColumns: [corePlans.id],
			name: "plan_prices_plan_id_plans_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const coreSubscriptions = core.table("subscriptions", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	workspaceId: uuid("workspace_id"),
	stripeCustomerId: varchar("stripe_customer_id", { length: 255 }),
	status: coreSubscriptionStatusEnum("status").default('incomplete').notNull(),
	planId: uuid("plan_id").notNull(),
	planStartedAt: timestamp("plan_started_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	planExpiredAt: timestamp("plan_expired_at", { withTimezone: true, mode: 'string' }).notNull(),
	bullingInterval: coreBillingInterval("bulling_interval").notNull(),
	billingCycleAnchor: timestamp("billing_cycle_anchor", { withTimezone: true, mode: 'string' }),
	stripeSubscriptionId: varchar("stripe_subscription_id", { length: 255 }),
	trialStart: timestamp("trialStart", { withTimezone: true, mode: 'string' }),
	trialEnd: timestamp("trialEnd", { withTimezone: true, mode: 'string' }),
},
(table) => {
	return {
		uniqueByWs: uniqueIndex("unique_by_ws").using("btree", table.workspaceId.asc().nullsLast()),
		subscriptionsPlanIdPlansIdFk: foreignKey({
			columns: [table.planId],
			foreignColumns: [corePlans.id],
			name: "subscriptions_plan_id_plans_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
		subscriptionsWorkspaceIdWorkspacesIdFk: foreignKey({
			columns: [table.workspaceId],
			foreignColumns: [coreWorkspaces.id],
			name: "subscriptions_workspace_id_workspaces_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const coreStripeEvents = core.table("stripe_events", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	stripeEventId: varchar("stripe_event_id", { length: 255 }),
	type: varchar("type", { length: 255 }).notNull(),
	data: jsonb("data").notNull(),
	status: coreStripeEventStausEnum("status").default('PROCESSING').notNull(),
	error: jsonb("error"),
},
(table) => {
	return {
		eventId: uniqueIndex("event_id").using("btree", table.stripeEventId.asc().nullsLast()),
	}
});

export const coreCurrencies = core.table("currencies", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	code: varchar("code", { length: 3 }).notNull(),
	number: varchar("number", { length: 3 }).notNull(),
	decimalDigits: integer("decimalDigits").notNull(),
	name: varchar("name", { length: 100 }).notNull(),
	keywords: varchar("keywords", { length: 1024 }),
},
(table) => {
	return {
		uniqueCode: uniqueIndex("unique_code").using("btree", table.code.asc().nullsLast()),
	}
});

export const corePayments = core.table("payments", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	workspaceId: uuid("workspace_id"),
	stripePaymentIntentId: varchar("stripe_payment_intent_id", { length: 255 }).notNull(),
	amount: integer("amount").notNull(),
	currencyId: uuid("currency_id"),
	status: varchar("status").notNull(),
	description: text("description"),
},
(table) => {
	return {
		paymentsCurrencyIdCurrenciesIdFk: foreignKey({
			columns: [table.currencyId],
			foreignColumns: [coreCurrencies.id],
			name: "payments_currency_id_currencies_id_fk"
		}).onUpdate("cascade").onDelete("set null"),
		paymentsWorkspaceIdWorkspacesIdFk: foreignKey({
			columns: [table.workspaceId],
			foreignColumns: [coreWorkspaces.id],
			name: "payments_workspace_id_workspaces_id_fk"
		}).onUpdate("cascade").onDelete("set null"),
		paymentsStripePaymentIntentIdUnique: unique("payments_stripe_payment_intent_id_unique").on(table.stripePaymentIntentId),
	}
});

export const coreQuotaTypePrices = core.table("quota_type_prices", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	quotaTypeId: uuid("quota_type_id").notNull(),
	currencyId: uuid("currency_id").notNull(),
	amount: integer("amount").notNull(),
	stripePriceId: varchar("stripe_price_id", { length: 255 }).notNull(),
},
(table) => {
	return {
		quotaTypePricesCurrencyIdCurrenciesIdFk: foreignKey({
			columns: [table.currencyId],
			foreignColumns: [coreCurrencies.id],
			name: "quota_type_prices_currency_id_currencies_id_fk"
		}),
		quotaTypePricesQuotaTypeIdQuotaTypesIdFk: foreignKey({
			columns: [table.quotaTypeId],
			foreignColumns: [coreQuotaTypes.id],
			name: "quota_type_prices_quota_type_id_quota_types_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const coreSettings = core.table("settings", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	workspaceId: uuid("workspace_id"),
	key: varchar("key", { length: 255 }).notNull(),
	value: varchar("value"),
	type: coreSettingsValueType("type").notNull(),
},
(table) => {
	return {
		uniqueKey: uniqueIndex("unique_key").using("btree", table.workspaceId.asc().nullsLast(), table.key.asc().nullsLast()),
		settingsWorkspaceIdWorkspacesIdFk: foreignKey({
			columns: [table.workspaceId],
			foreignColumns: [coreWorkspaces.id],
			name: "settings_workspace_id_workspaces_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const corePlans = core.table("plans", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	name: varchar("name", { length: 100 }).notNull(),
	description: text("description"),
	stripeProductId: varchar("stripe_product_id", { length: 255 }),
	enabled: boolean("enabled").default(false),
	isDefault: boolean("is_default").default(false).notNull(),
	order: integer("order").default(0).notNull(),
},
(table) => {
	return {
		uniquePlan: uniqueIndex("unique_plan").using("btree", table.stripeProductId.asc().nullsLast()),
	}
});

export const coreViews = core.table("views", {
	workspaceId: uuid("workspace_id").notNull(),
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdById: uuid("created_by_id"),
	level: coreViewLevel("level").default('PERSONAL').notNull(),
	key: varchar("key", { length: 255 }).notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	config: jsonb("config").notNull(),
	slug: varchar("slug", { length: 255 }).notNull(),
},
(table) => {
	return {
		keyIdx: index("key_index").using("btree", table.key.asc().nullsLast()),
		uniqueSlugIdx: uniqueIndex("unique_slug_index").using("btree", table.workspaceId.asc().nullsLast(), table.key.asc().nullsLast(), table.slug.asc().nullsLast()),
		viewsCreatedByIdUsersIdFk: foreignKey({
			columns: [table.createdById],
			foreignColumns: [coreUsers.id],
			name: "views_created_by_id_users_id_fk"
		}).onUpdate("cascade").onDelete("set null"),
		viewsWorkspaceIdWorkspacesIdFk: foreignKey({
			columns: [table.workspaceId],
			foreignColumns: [coreWorkspaces.id],
			name: "views_workspace_id_workspaces_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const coreUsers = core.table("users", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	email: varchar("email", { length: 255 }).notNull(),
	emailVerified: timestamp("emailVerified", { mode: 'string' }),
	phone: text("phone"),
	preferredLocale: varchar("preferred_locale", { length: 5 }).default('bg_BG').notNull(),
	stripeCustomerId: varchar("stripe_customer_id", { length: 255 }),
	preferredTheme: coreUserPrefferedThemeEnum("preferred_theme").default('system').notNull(),
});

export const corePermissions = core.table("permissions", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	roleId: uuid("role_id"),
	key: varchar("key", { length: 512 }).notNull(),
	enabled: boolean("enabled").default(false).notNull(),
	type: varchar("type").default(''),
},
(table) => {
	return {
		uniquePermsPerRole: uniqueIndex("unique_perms_per_role").using("btree", table.roleId.asc().nullsLast(), table.key.asc().nullsLast()),
		permissionsRoleIdRolesIdFk: foreignKey({
			columns: [table.roleId],
			foreignColumns: [coreRoles.id],
			name: "permissions_role_id_roles_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const coreUsersRoles = core.table("users_roles", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	workspaceId: uuid("workspace_id").notNull(),
	userId: uuid("user_id"),
	roleId: uuid("role_id"),
},
(table) => {
	return {
		roleIdx: uniqueIndex("role_index").using("btree", table.workspaceId.asc().nullsLast(), table.userId.asc().nullsLast()),
		usersRolesRoleIdRolesIdFk: foreignKey({
			columns: [table.roleId],
			foreignColumns: [coreRoles.id],
			name: "users_roles_role_id_roles_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
		usersRolesUserIdUsersIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [coreUsers.id],
			name: "users_roles_user_id_users_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
		usersRolesWorkspaceIdWorkspacesIdFk: foreignKey({
			columns: [table.workspaceId],
			foreignColumns: [coreWorkspaces.id],
			name: "users_roles_workspace_id_workspaces_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const coreWorkspaceInvites = core.table("workspace_invites", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	expiredAt: timestamp("expired_at", { withTimezone: true, mode: 'string' }).notNull(),
	userActionAt: timestamp("user_action_at", { withTimezone: true, mode: 'string' }),
	type: coreWorkspaceUsersType("type").notNull(),
	email: varchar("email", { length: 255 }),
	userId: uuid("user_id"),
	workspaceId: uuid("workspace_id").notNull(),
	status: coreWorkspaceInviteStatus("status").default('PENDING').notNull(),
	roleId: uuid("role_id").notNull(),
	metadata: jsonb("metadata"),
},
(table) => {
	return {
		emailIdx: index("email_index").using("btree", table.email.asc().nullsLast()),
		workspaceInvitesRoleIdRolesIdFk: foreignKey({
			columns: [table.roleId],
			foreignColumns: [coreRoles.id],
			name: "workspace_invites_role_id_roles_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
		workspaceInvitesUserIdUsersIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [coreUsers.id],
			name: "workspace_invites_user_id_users_id_fk"
		}).onUpdate("cascade").onDelete("set null"),
		workspaceInvitesWorkspaceIdWorkspacesIdFk: foreignKey({
			columns: [table.workspaceId],
			foreignColumns: [coreWorkspaces.id],
			name: "workspace_invites_workspace_id_workspaces_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const contactsTags = contacts.table("tags", {
	name: varchar("name", { length: 255 }).notNull(),
	colorHex: varchar("color_hex", { length: 7 }).default('#000000'),
	workspaceId: uuid("workspace_id").notNull(),
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
},
(table) => {
	return {
		uniqueName: uniqueIndex("unique_name").using("btree", table.workspaceId.asc().nullsLast(), table.name.asc().nullsLast()),
		tagsWorkspaceIdWorkspacesIdFk: foreignKey({
			columns: [table.workspaceId],
			foreignColumns: [coreWorkspaces.id],
			name: "tags_workspace_id_workspaces_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const coreWorkspaces = core.table("workspaces", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	slug: varchar("slug", { length: 255 }).notNull(),
	ownerId: uuid("owner_id").notNull(),
	planId: uuid("plan_id"),
	regionId: uuid("region_id"),
},
(table) => {
	return {
		slugIdx: uniqueIndex("slug_idx").using("btree", table.slug.asc().nullsLast()),
		workspacesOwnerIdUsersIdFk: foreignKey({
			columns: [table.ownerId],
			foreignColumns: [coreUsers.id],
			name: "workspaces_owner_id_users_id_fk"
		}).onUpdate("restrict").onDelete("restrict"),
		workspacesPlanIdPlansIdFk: foreignKey({
			columns: [table.planId],
			foreignColumns: [corePlans.id],
			name: "workspaces_plan_id_plans_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
		workspacesRegionIdRegionsIdFk: foreignKey({
			columns: [table.regionId],
			foreignColumns: [coreRegions.id],
			name: "workspaces_region_id_regions_id_fk"
		}).onUpdate("cascade").onDelete("restrict"),
	}
});

export const coreWorkspacesApps = core.table("workspaces_apps", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	appSlug: varchar("app_slug", { length: 255 }).notNull(),
	workspaceId: uuid("workspace_id").notNull(),
	disabledAt: timestamp("disabled_at", { withTimezone: true, mode: 'string' }),
},
(table) => {
	return {
		appSlugWorkspaceIdIdx: uniqueIndex().using("btree", table.appSlug.asc().nullsLast(), table.workspaceId.asc().nullsLast()),
		workspacesAppsWorkspaceIdWorkspacesIdFk: foreignKey({
			columns: [table.workspaceId],
			foreignColumns: [coreWorkspaces.id],
			name: "workspaces_apps_workspace_id_workspaces_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const coreDefaultViews = core.table("default_views", {
	workspaceId: uuid("workspace_id").notNull(),
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	viewId: uuid("view_id"),
	key: varchar("key", { length: 255 }).notNull(),
},
(table) => {
	return {
		uniqueDefaultView: uniqueIndex("unique_default_view").using("btree", table.workspaceId.asc().nullsLast(), table.key.asc().nullsLast()),
		defaultViewsViewIdViewsIdFk: foreignKey({
			columns: [table.viewId],
			foreignColumns: [coreViews.id],
			name: "default_views_view_id_views_id_fk"
		}),
		defaultViewsWorkspaceIdWorkspacesIdFk: foreignKey({
			columns: [table.workspaceId],
			foreignColumns: [coreWorkspaces.id],
			name: "default_views_workspace_id_workspaces_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const coreRegions = core.table("regions", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	code: varchar("code", { length: 50 }).default('fra1').notNull(),
	flag: varchar("flag", { length: 50 }).default('DE').notNull(),
});

export const coreApiKeys = core.table("api_keys", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	createdById: uuid("created_by_id").notNull(),
	enabled: boolean("enabled").default(true).notNull(),
	workspaceId: uuid("workspace_id").notNull(),
	roleId: uuid("role_id"),
	value: varchar("value", { length: 512 }).notNull(),
	validUntilAt: timestamp("valid_until_at", { withTimezone: true, mode: 'string' }),
},
(table) => {
	return {
		uniqueApiKey: uniqueIndex("unique_api_key").using("btree", table.workspaceId.asc().nullsLast(), table.name.asc().nullsLast()),
		valueIdx: index("value_index").using("btree", table.value.asc().nullsLast()),
		apiKeysCreatedByIdUsersIdFk: foreignKey({
			columns: [table.createdById],
			foreignColumns: [coreUsers.id],
			name: "api_keys_created_by_id_users_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
		apiKeysRoleIdRolesIdFk: foreignKey({
			columns: [table.roleId],
			foreignColumns: [coreRoles.id],
			name: "api_keys_role_id_roles_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
		apiKeysWorkspaceIdWorkspacesIdFk: foreignKey({
			columns: [table.workspaceId],
			foreignColumns: [coreWorkspaces.id],
			name: "api_keys_workspace_id_workspaces_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const coreWorkspacesUsers = core.table("workspaces_users", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	userId: uuid("user_id").notNull(),
	workspaceId: uuid("workspace_id").notNull(),
	type: coreWorkspaceUsersType("type").notNull(),
	givenName: varchar("given_name", { length: 255 }),
	jobPosition: varchar("job_position", { length: 255 }),
	organization: varchar("organization", { length: 255 }),
},
(table) => {
	return {
		uniqueUserIdx: uniqueIndex("unique_user_idx").using("btree", table.userId.asc().nullsLast(), table.workspaceId.asc().nullsLast(), table.type.asc().nullsLast()),
		workspacesUsersUserIdUsersIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [coreUsers.id],
			name: "workspaces_users_user_id_users_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
		workspacesUsersWorkspaceIdWorkspacesIdFk: foreignKey({
			columns: [table.workspaceId],
			foreignColumns: [coreWorkspaces.id],
			name: "workspaces_users_workspace_id_workspaces_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const coreRecentlyUsedApps = core.table("recently_used_apps", {
	workspaceId: uuid("workspace_id").notNull(),
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdById: uuid("created_by_id"),
	appSlug: varchar("app_slug", { length: 255 }).notNull(),
},
(table) => {
	return {
		recentlyUsedAppsCreatedByIdUsersIdFk: foreignKey({
			columns: [table.createdById],
			foreignColumns: [coreUsers.id],
			name: "recently_used_apps_created_by_id_users_id_fk"
		}).onUpdate("cascade").onDelete("set null"),
		recentlyUsedAppsWorkspaceIdWorkspacesIdFk: foreignKey({
			columns: [table.workspaceId],
			foreignColumns: [coreWorkspaces.id],
			name: "recently_used_apps_workspace_id_workspaces_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const sitebuilderV1Apis = sitebuilderV1.table("apis", {
	workspaceId: uuid("workspace_id").notNull(),
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdById: uuid("created_by_id"),
	entityId: uuid("entity_id").notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	method: varchar("method").notNull(),
	url: varchar("url"),
	headers: jsonb("headers"),
	body: jsonb("body"),
},
(table) => {
	return {
		uniqueEnApi: uniqueIndex("unique_en_api").using("btree", table.entityId.asc().nullsLast(), table.name.asc().nullsLast()),
		apisCreatedByIdUsersIdFk: foreignKey({
			columns: [table.createdById],
			foreignColumns: [coreUsers.id],
			name: "apis_created_by_id_users_id_fk"
		}).onUpdate("cascade").onDelete("set null"),
		apisEntityIdEntitiesIdFk: foreignKey({
			columns: [table.entityId],
			foreignColumns: [sitebuilderV1Entities.id],
			name: "apis_entity_id_entities_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
		apisWorkspaceIdWorkspacesIdFk: foreignKey({
			columns: [table.workspaceId],
			foreignColumns: [coreWorkspaces.id],
			name: "apis_workspace_id_workspaces_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const sitebuilderV1Variables = sitebuilderV1.table("variables", {
	workspaceId: uuid("workspace_id").notNull(),
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdById: uuid("created_by_id"),
	entityId: uuid("entity_id").notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	initialValue: varchar("initial_value", { length: 255 }).default('').notNull(),
},
(table) => {
	return {
		uniqueEnVar: uniqueIndex("unique_en_var").using("btree", table.entityId.asc().nullsLast(), table.name.asc().nullsLast()),
		variablesCreatedByIdUsersIdFk: foreignKey({
			columns: [table.createdById],
			foreignColumns: [coreUsers.id],
			name: "variables_created_by_id_users_id_fk"
		}).onUpdate("cascade").onDelete("set null"),
		variablesEntityIdEntitiesIdFk: foreignKey({
			columns: [table.entityId],
			foreignColumns: [sitebuilderV1Entities.id],
			name: "variables_entity_id_entities_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
		variablesWorkspaceIdWorkspacesIdFk: foreignKey({
			columns: [table.workspaceId],
			foreignColumns: [coreWorkspaces.id],
			name: "variables_workspace_id_workspaces_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const sitebuilderV1Entities = sitebuilderV1.table("entities", {
	workspaceId: uuid("workspace_id").notNull(),
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdById: uuid("created_by_id"),
	name: varchar("name", { length: 255 }).notNull(),
	description: varchar("description", { length: 255 }),
	slug: varchar("slug", { length: 1024 }).notNull(),
	projectId: uuid("project_id").notNull(),
	data: jsonb("data").notNull(),
	type: sitebuilderV1EntityType("type").default('PAGE').notNull(),
	css: text("css").default('').notNull(),
	metadata: jsonb("metadata").default({}).notNull(),
},
(table) => {
	return {
		uniqueEntitySlug: uniqueIndex("unique_entity_slug").using("btree", table.slug.asc().nullsLast(), table.projectId.asc().nullsLast(), table.type.asc().nullsLast()),
		entitiesCreatedByIdUsersIdFk: foreignKey({
			columns: [table.createdById],
			foreignColumns: [coreUsers.id],
			name: "entities_created_by_id_users_id_fk"
		}).onUpdate("cascade").onDelete("set null"),
		entitiesProjectIdProjectsIdFk: foreignKey({
			columns: [table.projectId],
			foreignColumns: [sitebuilderV1Projects.id],
			name: "entities_project_id_projects_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
		entitiesWorkspaceIdWorkspacesIdFk: foreignKey({
			columns: [table.workspaceId],
			foreignColumns: [coreWorkspaces.id],
			name: "entities_workspace_id_workspaces_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const sitebuilderV1Projects = sitebuilderV1.table("projects", {
	workspaceId: uuid("workspace_id").notNull(),
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdById: uuid("created_by_id"),
	name: varchar("name", { length: 255 }).notNull(),
	slug: varchar("slug", { length: 255 }).notNull(),
	metadata: jsonb("metadata").default({}).notNull(),
	css: text("css").default('').notNull(),
},
(table) => {
	return {
		uniquePrNameWs: uniqueIndex("unique_pr_name_ws").using("btree", table.name.asc().nullsLast(), table.workspaceId.asc().nullsLast()),
		uniquePrSlugWs: uniqueIndex("unique_pr_slug_ws").using("btree", table.slug.asc().nullsLast(), table.workspaceId.asc().nullsLast()),
		projectsCreatedByIdUsersIdFk: foreignKey({
			columns: [table.createdById],
			foreignColumns: [coreUsers.id],
			name: "projects_created_by_id_users_id_fk"
		}).onUpdate("cascade").onDelete("set null"),
		projectsWorkspaceIdWorkspacesIdFk: foreignKey({
			columns: [table.workspaceId],
			foreignColumns: [coreWorkspaces.id],
			name: "projects_workspace_id_workspaces_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const coreNotificationsSettings = core.table("notifications_settings", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	appSlug: varchar("app_slug", { length: 255 }).notNull(),
	workspaceId: uuid("workspace_id").notNull(),
	email: boolean("email").default(true).notNull(),
	key: varchar("key", { length: 255 }).notNull(),
	userId: uuid("user_id").notNull(),
	inApp: boolean("in_app").default(true).notNull(),
},
(table) => {
	return {
		notificationsSettingsUserIdUsersIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [coreUsers.id],
			name: "notifications_settings_user_id_users_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
		notificationsSettingsWorkspaceIdWorkspacesIdFk: foreignKey({
			columns: [table.workspaceId],
			foreignColumns: [coreWorkspaces.id],
			name: "notifications_settings_workspace_id_workspaces_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const coreBankAccounts = core.table("bank_accounts", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdById: uuid("created_by_id").notNull(),
	workspaceId: uuid("workspace_id").notNull(),
	name: varchar("name", { length: 50 }).notNull(),
	description: varchar("description", { length: 255 }),
	bankName: varchar("bank_name", { length: 255 }).notNull(),
	iban: varchar("iban", { length: 255 }).notNull(),
	bic: varchar("bic", { length: 255 }).notNull(),
},
(table) => {
	return {
		uniqueBankAccount: uniqueIndex("unique_bank_account").using("btree", table.workspaceId.asc().nullsLast(), table.name.asc().nullsLast()),
		bankAccountsCreatedByIdUsersIdFk: foreignKey({
			columns: [table.createdById],
			foreignColumns: [coreUsers.id],
			name: "bank_accounts_created_by_id_users_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
		bankAccountsWorkspaceIdWorkspacesIdFk: foreignKey({
			columns: [table.workspaceId],
			foreignColumns: [coreWorkspaces.id],
			name: "bank_accounts_workspace_id_workspaces_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const relationshipsAvatarToUser = relationships.table("avatar_to_user", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	fileId: uuid("file_id").notNull(),
	userId: uuid("user_id").notNull(),
},
(table) => {
	return {
		uniqueAvatarToUser: uniqueIndex("unique_avatar_to_user").using("btree", table.userId.asc().nullsLast()),
		uniqueWorkspaceType: uniqueIndex("unique_workspace_type").using("btree", table.userId.asc().nullsLast()),
		avatarToUserFileIdFilesIdFk: foreignKey({
			columns: [table.fileId],
			foreignColumns: [mediaFiles.id],
			name: "avatar_to_user_file_id_files_id_fk"
		}).onUpdate("cascade").onDelete("restrict"),
		avatarToUserUserIdUsersIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [coreUsers.id],
			name: "avatar_to_user_user_id_users_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const relationshipsImageToWorkspace = relationships.table("image_to_workspace", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	workspaceId: uuid("workspace_id").notNull(),
	fileId: uuid("file_id").notNull(),
	type: varchar("type", { length: 50 }).notNull(),
},
(table) => {
	return {
		uniqueImageToWorkspaceType: uniqueIndex("unique_image_to_workspace_type").using("btree", table.workspaceId.asc().nullsLast(), table.type.asc().nullsLast()),
		imageToWorkspaceFileIdFilesIdFk: foreignKey({
			columns: [table.fileId],
			foreignColumns: [mediaFiles.id],
			name: "image_to_workspace_file_id_files_id_fk"
		}).onUpdate("cascade").onDelete("restrict"),
		imageToWorkspaceWorkspaceIdWorkspacesIdFk: foreignKey({
			columns: [table.workspaceId],
			foreignColumns: [coreWorkspaces.id],
			name: "image_to_workspace_workspace_id_workspaces_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});