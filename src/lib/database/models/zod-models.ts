/**
 * @VSCode_Snippet
 * "zodInsertCreateSchemas": {
		"prefix": "drizzlezod",
		"body": [
			"export const insert${1/(.*)/${1:/capitalize}/}Schema = createInsertSchema($1)",
			"export const select${1/(.*)/${1:/capitalize}/}Schema = createSelectSchema($1)",
			"export type Insert${1/(.*)/${1:/capitalize}/}Schema = z.infer<typeof insert${1/(.*)/${1:/capitalize}/}Schema>",
			"export type Select${1/(.*)/${1:/capitalize}/}Schema = z.infer<typeof select${1/(.*)/${1:/capitalize}/}Schema>"
		]
	}
    
    Add this to your snippets. Copy the import name from the schema (eg "coreUsers").
    type drizzlezod, select the snippet, paste the name and click tab.
    voala.
    // !Important: Always click tab to apply capital letters.
 */

import {
  coreUserProfiles,
  coreWorkspaces,
  coreWorkspacesApps,
  coreWorkspacesUsers,
  coreUsers,
  corePermissions,
  coreRoles,
  coreUsersRoles,
  coreWorkspaceInvites,
  coreSettings,
  coreSubscriptions,
  coreCurrencies,
  corePayments,
  corePlanPrices,
  corePlans,
  corePlanQuotas,
  coreQuotaTypePrices,
  coreQuotaTypes,
  coreQuotaUsage,
  coreStripeEvents,
  coreViews,
  coreDefaultViews,
  coreNotificationsSettings,
  // contacts
  contactsContacts,
  contactsContactsFields,
  contactsContactsTypes,
  contactsContactsValidators,
  contactsContactsValues,
  contactsTagToContact,
  contactsTagToContactType,
  contactsTags,
  coreRegions,
  // media
  mediaFiles,
  mediaFileMediaFormats,
  mediaFolders,
  mediaFileToFolder,
  mediaFormats,
  coreBankAccounts,
  coreChannels,
  coreWorkspaceCurrencies,
  coreApiKeys,
  coreRecentlyUsedApps,
  // sitebuilder
  sitebuilderV1Entities,
  sitebuilderV1Projects,
  sitebuilderV1Apis,
  sitebuilderV1Variables,
  // mail
  mailMailboxes,
  // cms
  cmsRows,
  cmsRowsFields,
  cmsRowsTypes,
  cmsRowsValues,
  cmsRowsValidators,
  cmsSpaces,
  // relationships
  relationshipsAvatarToUser,
  relationshipsImageToWorkspace,
} from '@/../../migrations/schema'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const insertCmsSpacesSchema = createInsertSchema(cmsSpaces)
export const selectCmsSpacesSchema = createSelectSchema(cmsSpaces)
export type InsertCmsSpacesSchema = z.infer<typeof insertCmsSpacesSchema>
export type SelectCmsSpacesSchema = z.infer<typeof selectCmsSpacesSchema>

export const insertCmsRowsValidatorsSchema =
  createInsertSchema(cmsRowsValidators)
export const selectCmsRowsValidatorsSchema =
  createSelectSchema(cmsRowsValidators)
export type InsertCmsRowsValidatorsSchema = z.infer<
  typeof insertCmsRowsValidatorsSchema
>
export type SelectCmsRowsValidatorsSchema = z.infer<
  typeof selectCmsRowsValidatorsSchema
>

export const insertCmsRowsValuesSchema = createInsertSchema(cmsRowsValues)
export const selectCmsRowsValuesSchema = createSelectSchema(cmsRowsValues)
export type InsertCmsRowsValuesSchema = z.infer<
  typeof insertCmsRowsValuesSchema
>
export type SelectCmsRowsValuesSchema = z.infer<
  typeof selectCmsRowsValuesSchema
>

export const insertCmsRowsTypesSchema = createInsertSchema(cmsRowsTypes, {
  config: z.record(z.string(), z.any()),
})
export const selectCmsRowsTypesSchema = createSelectSchema(cmsRowsTypes, {
  config: z.record(z.string(), z.any()),
})
export type InsertCmsRowsTypesSchema = z.infer<typeof insertCmsRowsTypesSchema>
export type SelectCmsRowsTypesSchema = z.infer<typeof selectCmsRowsTypesSchema>

export const insertCmsRowsFieldsSchema = createInsertSchema(cmsRowsFields)
export const selectCmsRowsFieldsSchema = createSelectSchema(cmsRowsFields)
export type InsertCmsRowsFieldsSchema = z.infer<
  typeof insertCmsRowsFieldsSchema
>
export type SelectCmsRowsFieldsSchema = z.infer<
  typeof selectCmsRowsFieldsSchema
>

export const insertCmsRowsSchema = createInsertSchema(cmsRows)
export const selectCmsRowsSchema = createSelectSchema(cmsRows)
export type InsertCmsRowsSchema = z.infer<typeof insertCmsRowsSchema>
export type SelectCmsRowsSchema = z.infer<typeof selectCmsRowsSchema>

export const insertSitebuilderV1VariablesSchema = createInsertSchema(
  sitebuilderV1Variables
)
export const selectSitebuilderV1VariablesSchema = createSelectSchema(
  sitebuilderV1Variables
)
export type InsertSitebuilderV1VariablesSchema = z.infer<
  typeof insertSitebuilderV1VariablesSchema
>
export type SelectSitebuilderV1VariablesSchema = z.infer<
  typeof selectSitebuilderV1VariablesSchema
>

export const insertSitebuilderV1ApisSchema = createInsertSchema(
  sitebuilderV1Apis,
  {
    headers: z.record(z.string(), z.string()).optional().nullable(),
    body: z.record(z.string(), z.any()).optional().nullable(),
  }
)
export const selectSitebuilderV1ApisSchema = createSelectSchema(
  sitebuilderV1Apis,
  {
    headers: z.record(z.string(), z.string()).nullable(),
    body: z.record(z.string(), z.any()).nullable(),
  }
)
export type InsertSitebuilderV1ApisSchema = z.infer<
  typeof insertSitebuilderV1ApisSchema
>
export type SelectSitebuilderV1ApisSchema = z.infer<
  typeof selectSitebuilderV1ApisSchema
>

export const selectSitebuilderV1EntitiesDataSchema = z.record(
  z.string(),
  z.any()
)

export const insertSitebuilderV1ProjectsSchema = createInsertSchema(
  sitebuilderV1Projects,
  { metadata: z.record(z.string(), z.any()).nullable() }
)
export const selectSitebuilderV1ProjectsSchema = createSelectSchema(
  sitebuilderV1Projects,
  { metadata: z.record(z.string(), z.any()).nullable() }
)
export type InsertSitebuilderV1ProjectsSchema = z.infer<
  typeof insertSitebuilderV1ProjectsSchema
>
export type SelectSitebuilderV1ProjectsSchema = z.infer<
  typeof selectSitebuilderV1ProjectsSchema
>

export const insertSitebuilderV1EntitiesSchema = createInsertSchema(
  sitebuilderV1Entities,
  {
    data: selectSitebuilderV1EntitiesDataSchema,
    metadata: z.record(z.string(), z.any()).nullable(),
  }
)
export const selectSitebuilderV1EntitiesSchema = createSelectSchema(
  sitebuilderV1Entities,
  {
    data: selectSitebuilderV1EntitiesDataSchema,
    metadata: z.record(z.string(), z.any()).nullable(),
  }
)
export type InsertSitebuilderV1EntitiesSchema = z.infer<
  typeof insertSitebuilderV1EntitiesSchema
>
export type SelectSitebuilderV1EntitiesSchema = z.infer<
  typeof selectSitebuilderV1EntitiesSchema
>

export const insertMediaFormatsSchema = createInsertSchema(mediaFormats, {
  extension: z.enum(['jpg', 'png', 'webp']),
})
export const selectMediaFormatsSchema = createSelectSchema(mediaFormats, {
  extension: insertMediaFormatsSchema.shape.extension,
})
export type InsertMediaFormatsSchema = z.infer<typeof insertMediaFormatsSchema>
export type SelectMediaFormatsSchema = z.infer<typeof selectMediaFormatsSchema>

export const insertMediaFileToFolderSchema =
  createInsertSchema(mediaFileToFolder)
export const selectMediaFileToFolderSchema =
  createSelectSchema(mediaFileToFolder)
export type InsertMediaFileToFolderSchema = z.infer<
  typeof insertMediaFileToFolderSchema
>
export type SelectMediaFileToFolderSchema = z.infer<
  typeof selectMediaFileToFolderSchema
>

export const insertMediaFoldersSchema = createInsertSchema(mediaFolders)
export const selectMediaFoldersSchema = createSelectSchema(mediaFolders)
export type InsertMediaFoldersSchema = z.infer<typeof insertMediaFoldersSchema>
export type SelectMediaFoldersSchema = z.infer<typeof selectMediaFoldersSchema>

export const insertMediaFileMediaFormatsSchema = createInsertSchema(
  mediaFileMediaFormats
)
export const selectMediaFileMediaFormatsSchema = createSelectSchema(
  mediaFileMediaFormats
)
export type InsertMediaFileMediaFormatsSchema = z.infer<
  typeof insertMediaFileMediaFormatsSchema
>
export type SelectMediaFileMediaFormatsSchema = z.infer<
  typeof selectMediaFileMediaFormatsSchema
>

export const insertMediaFilesSchema = createInsertSchema(mediaFiles)
export const selectMediaFilesSchema = createSelectSchema(mediaFiles)
export type InsertMediaFilesSchema = z.infer<typeof insertMediaFilesSchema>
export type SelectMediaFilesSchema = z.infer<typeof selectMediaFilesSchema>

export const insertCoreDefaultViewsSchema = createInsertSchema(coreDefaultViews)
export const selectCoreDefaultViewsSchema = createSelectSchema(coreDefaultViews)
export type InsertCoreDefaultViewsSchema = z.infer<
  typeof insertCoreDefaultViewsSchema
>
export type SelectCoreDefaultViewsSchema = z.infer<
  typeof selectCoreDefaultViewsSchema
>

export const insertCoreViewsSchema = createInsertSchema(coreViews, {
  config: z.record(z.string(), z.any()).nullable(),
})
export const selectCoreViewsSchema = createSelectSchema(coreViews)
export type InsertCoreViewsSchema = z.infer<typeof insertCoreViewsSchema>
export type SelectCoreViewsSchema = z.infer<typeof selectCoreViewsSchema>

export const insertContactsTagsSchema = createInsertSchema(contactsTags)
export const selectContactsTagsSchema = createSelectSchema(contactsTags)
export type InsertContactsTagsSchema = z.infer<typeof insertContactsTagsSchema>
export type SelectContactsTagsSchema = z.infer<typeof selectContactsTagsSchema>

export const insertContactsTagToContactTypeSchema = createInsertSchema(
  contactsTagToContactType
)
export const selectContactsTagToContactTypeSchema = createSelectSchema(
  contactsTagToContactType
)
export type InsertContactsTagToContactTypeSchema = z.infer<
  typeof insertContactsTagToContactTypeSchema
>
export type SelectContactsTagToContactTypeSchema = z.infer<
  typeof selectContactsTagToContactTypeSchema
>

export const insertContactsTagToContactSchema =
  createInsertSchema(contactsTagToContact)
export const selectContactsTagToContactSchema =
  createSelectSchema(contactsTagToContact)
export type InsertContactsTagToContactSchema = z.infer<
  typeof insertContactsTagToContactSchema
>
export type SelectContactsTagToContactSchema = z.infer<
  typeof selectContactsTagToContactSchema
>

export const insertContactsContactsValuesSchema = createInsertSchema(
  contactsContactsValues
)
export const selectContactsContactsValuesSchema = createSelectSchema(
  contactsContactsValues
)
export type InsertContactsContactsValuesSchema = z.infer<
  typeof insertContactsContactsValuesSchema
>
export type SelectContactsContactsValuesSchema = z.infer<
  typeof selectContactsContactsValuesSchema
>

export const insertContactsContactsValidatorsSchema = createInsertSchema(
  contactsContactsValidators
)
export const selectContactsContactsValidatorsSchema = createSelectSchema(
  contactsContactsValidators
)
export type InsertContactsContactsValidatorsSchema = z.infer<
  typeof insertContactsContactsValidatorsSchema
>
export type SelectContactsContactsValidatorsSchema = z.infer<
  typeof selectContactsContactsValidatorsSchema
>

export const insertContactsContactsTypesSchema = createInsertSchema(
  contactsContactsTypes,
  {
    // todo Make reusable so that other types can inherit it
    config: z
      .object({
        fieldOrder: z.string().array().optional().nullable(),
        hiddenFields: z.string().array().optional().nullable(),
        addedFields: z.string().array().optional().nullable(),
      })
      .nullable(),
  }
)
export const selectContactsContactsTypesSchema = createSelectSchema(
  contactsContactsTypes,
  {
    // todo Make reusable so that other types can inherit it
    config: z
      .object({
        fieldOrder: z.string().array().optional().nullable(),
        hiddenFields: z.string().array().optional().nullable(),
        addedFields: z.string().array().optional().nullable(),
      })
      .nullable(),
  }
)
export type InsertContactsContactsTypesSchema = z.infer<
  typeof insertContactsContactsTypesSchema
>
export type SelectContactsContactsTypesSchema = z.infer<
  typeof selectContactsContactsTypesSchema
>

export const insertContactsContactsFieldsSchema = createInsertSchema(
  contactsContactsFields,
  { metadata: z.record(z.string(), z.any()) }
)
export const selectContactsContactsFieldsSchema = createSelectSchema(
  contactsContactsFields,
  { metadata: z.record(z.string(), z.any()) }
)
export type InsertContactsContactsFieldsSchema = z.infer<
  typeof insertContactsContactsFieldsSchema
>
export type SelectContactsContactsFieldsSchema = z.infer<
  typeof selectContactsContactsFieldsSchema
>

export const insertContactsContactsSchema = createInsertSchema(
  contactsContacts
).extend({ folio: z.number().int().optional() })
export const selectContactsContactsSchema = createSelectSchema(contactsContacts)
export type InsertContactsContactsSchema = z.infer<
  typeof insertContactsContactsSchema
>
export type SelectContactsContactsSchema = z.infer<
  typeof selectContactsContactsSchema
>

export const insertCoreStripeEventsSchema = createInsertSchema(coreStripeEvents)
export const selectCoreStripeEventsSchema = createSelectSchema(coreStripeEvents)
export type InsertCoreStripeEventsSchema = z.infer<
  typeof insertCoreStripeEventsSchema
>
export type SelectCoreStripeEventsSchema = z.infer<
  typeof selectCoreStripeEventsSchema
>

export const insertCoreQuotaUsageSchema = createInsertSchema(coreQuotaUsage)
export const selectCoreQuotaUsageSchema = createSelectSchema(coreQuotaUsage)
export type InsertCoreQuotaUsageSchema = z.infer<
  typeof insertCoreQuotaUsageSchema
>
export type SelectCoreQuotaUsageSchema = z.infer<
  typeof selectCoreQuotaUsageSchema
>

export const insertCoreQuotaTypesSchema = createInsertSchema(coreQuotaTypes)
export const selectCoreQuotaTypesSchema = createSelectSchema(coreQuotaTypes)
export type InsertCoreQuotaTypesSchema = z.infer<
  typeof insertCoreQuotaTypesSchema
>
export type SelectCoreQuotaTypesSchema = z.infer<
  typeof selectCoreQuotaTypesSchema
>

export const insertCoreQuotaTypePricesSchema =
  createInsertSchema(coreQuotaTypePrices)
export const selectCoreQuotaTypePricesSchema =
  createSelectSchema(coreQuotaTypePrices)
export type InsertCoreQuotaTypePricesSchema = z.infer<
  typeof insertCoreQuotaTypePricesSchema
>
export type SelectCoreQuotaTypePricesSchema = z.infer<
  typeof selectCoreQuotaTypePricesSchema
>

export const insertCorePlanQuotasSchema = createInsertSchema(corePlanQuotas)
export const selectCorePlanQuotasSchema = createSelectSchema(corePlanQuotas)
export type InsertCorePlanQuotasSchema = z.infer<
  typeof insertCorePlanQuotasSchema
>
export type SelectCorePlanQuotasSchema = z.infer<
  typeof selectCorePlanQuotasSchema
>

export const insertCorePlansSchema = createInsertSchema(corePlans)
export const selectCorePlansSchema = createSelectSchema(corePlans)
export type InsertCorePlansSchema = z.infer<typeof insertCorePlansSchema>
export type SelectCorePlansSchema = z.infer<typeof selectCorePlansSchema>

export const insertCorePlanPricesSchema = createInsertSchema(corePlanPrices)
export const selectCorePlanPricesSchema = createSelectSchema(corePlanPrices)
export type InsertCorePlanPricesSchema = z.infer<
  typeof insertCorePlanPricesSchema
>
export type SelectCorePlanPricesSchema = z.infer<
  typeof selectCorePlanPricesSchema
>

export const insertCorePaymentsSchema = createInsertSchema(corePayments)
export const selectCorePaymentsSchema = createSelectSchema(corePayments)
export type InsertCorePaymentsSchema = z.infer<typeof insertCorePaymentsSchema>
export type SelectCorePaymentsSchema = z.infer<typeof selectCorePaymentsSchema>

export const insertCoreCurrenciesSchema = createInsertSchema(coreCurrencies)
export const selectCoreCurrenciesSchema = createSelectSchema(coreCurrencies)
export type InsertCoreCurrenciesSchema = z.infer<
  typeof insertCoreCurrenciesSchema
>
export type SelectCoreCurrenciesSchema = z.infer<
  typeof selectCoreCurrenciesSchema
>

export const insertCoreUserProfilesSchema = createInsertSchema(coreUserProfiles)
export const selectCoreUserProfilesSchema = createSelectSchema(coreUserProfiles)
export type InsertCoreUserProfilesSchema = z.infer<
  typeof insertCoreUserProfilesSchema
>
export type SelectCoreUserProfilesSchema = z.infer<
  typeof selectCoreUserProfilesSchema
>

export const insertCoreWorkspacesSchema = createInsertSchema(coreWorkspaces)
export const selectCoreWorkspacesSchema = createSelectSchema(coreWorkspaces)
export type InsertCoreWorkspacesSchema = z.infer<
  typeof insertCoreWorkspacesSchema
>
export type SelectCoreWorkspacesSchema = z.infer<
  typeof selectCoreWorkspacesSchema
>

export const insertCoreWorkspacesAppsSchema =
  createInsertSchema(coreWorkspacesApps)
export const selectCoreWorkspacesAppsSchema =
  createSelectSchema(coreWorkspacesApps)
export type InsertCoreWorkspacesAppsSchema = z.infer<
  typeof insertCoreWorkspacesAppsSchema
>
export type SelectCoreWorkspacesAppsSchema = z.infer<
  typeof selectCoreWorkspacesAppsSchema
>

export const insertCoreWorkspacesUsersSchema =
  createInsertSchema(coreWorkspacesUsers)
export const selectCoreWorkspacesUsersSchema =
  createSelectSchema(coreWorkspacesUsers)
export type InsertCoreWorkspacesUsersSchema = z.infer<
  typeof insertCoreWorkspacesUsersSchema
>
export type SelectCoreWorkspacesUsersSchema = z.infer<
  typeof selectCoreWorkspacesUsersSchema
>

export const insertRelationshipAvatarToUserSchema = createInsertSchema(
  relationshipsAvatarToUser
)
export const selectRelationshipAvatarToUserSchema = createSelectSchema(
  relationshipsAvatarToUser
)
export type InsertRelationshipAvatarToUserSchema = z.infer<
  typeof insertRelationshipAvatarToUserSchema
>
export type SelectRelationshipAvatarToUserSchema = z.infer<
  typeof selectRelationshipAvatarToUserSchema
>

export const insertRelationshipImageToWorkspaceSchema = createInsertSchema(
  relationshipsImageToWorkspace
)
export const selectRelationshipImageToWorkspaceSchema = createSelectSchema(
  relationshipsImageToWorkspace
)
export type InsertRelationshipImageToWorkspaceSchema = z.infer<
  typeof insertRelationshipImageToWorkspaceSchema
>
export type SelectRelationshipImageToWorkspaceSchema = z.infer<
  typeof selectRelationshipImageToWorkspaceSchema
>

export const insertCoreUsersSchema = createInsertSchema(coreUsers)
export const selectCoreUsersSchema = createSelectSchema(coreUsers)
export type InsertCoreUsersSchema = z.infer<typeof insertCoreUsersSchema>
export type SelectCoreUsersSchema = z.infer<typeof selectCoreUsersSchema>

export const insertCorePermissionsSchema = createInsertSchema(corePermissions)
export const selectCorePermissionsSchema = createSelectSchema(corePermissions)
export type InsertCorePermissionsSchema = z.infer<
  typeof insertCorePermissionsSchema
>
export type SelectCorePermissionsSchema = z.infer<
  typeof selectCorePermissionsSchema
>

export const insertCoreRolesSchema = createInsertSchema(coreRoles)
export const selectCoreRolesSchema = createSelectSchema(coreRoles)
export type InsertCoreRolesSchema = z.infer<typeof insertCoreRolesSchema>
export type SelectCoreRolesSchema = z.infer<typeof selectCoreRolesSchema>

export const insertCoreChannelsSchema = createInsertSchema(coreChannels)
export const selectCoreChannelsSchema = createSelectSchema(coreChannels)
export type InsertCoreChannelsSchema = z.infer<typeof insertCoreChannelsSchema>
export type SelectCoreChannelsSchema = z.infer<typeof selectCoreChannelsSchema>

export const insertCoreRecentlyUsedAppsSchema =
  createInsertSchema(coreRecentlyUsedApps)
export const selectCoreRecentlyUsedAppsSchema =
  createSelectSchema(coreRecentlyUsedApps)
export type InsertCoreRecentlyUsedAppsSchema = z.infer<
  typeof insertCoreRecentlyUsedAppsSchema
>
export type SelectCoreRecentlyUsedAppsSchema = z.infer<
  typeof selectCoreRecentlyUsedAppsSchema
>

export const insertCoreWorkspaceCurrenciesSchema = createInsertSchema(
  coreWorkspaceCurrencies
)
export const selectCoreWorkspaceCurrenciesSchema = createSelectSchema(
  coreWorkspaceCurrencies
)
export type InsertCoreWorkspaceCurrenciesSchema = z.infer<
  typeof insertCoreWorkspaceCurrenciesSchema
>
export type SelectCoreWorkspaceCurrenciesSchema = z.infer<
  typeof selectCoreWorkspaceCurrenciesSchema
>

export const insertCoreBankAccountsSchema = createInsertSchema(coreBankAccounts)
export const selectCoreBankAccountsSchema = createSelectSchema(coreBankAccounts)
export type InsertCoreBankAccountsSchema = z.infer<
  typeof insertCoreBankAccountsSchema
>
export type SelectCoreBankAccountsSchema = z.infer<
  typeof selectCoreBankAccountsSchema
>
export const insertCoreApiKeysSchema = createInsertSchema(coreApiKeys)
export const selectCoreApiKeysSchema = createSelectSchema(coreApiKeys)
export type InsertCoreApiKeysSchema = z.infer<typeof insertCoreApiKeysSchema>
export type SelectCoreApiKeysSchema = z.infer<typeof selectCoreApiKeysSchema>

export const insertCoreUsersRolesSchema = createInsertSchema(coreUsersRoles)
export const selectCoreUsersRolesSchema = createSelectSchema(coreUsersRoles)
export type InsertCoreUsersRolesSchema = z.infer<
  typeof insertCoreUsersRolesSchema
>
export type SelectCoreUsersRolesSchema = z.infer<
  typeof selectCoreUsersRolesSchema
>

export const insertCoreWorkspaceInvitesSchema = createInsertSchema(
  coreWorkspaceInvites
).extend({ metadata: z.unknown().optional() })
export const selectCoreWorkspaceInvitesSchema = createSelectSchema(
  coreWorkspaceInvites
).extend({ metadata: z.unknown().optional() })
export type InsertCoreWorkspaceInvitesSchema = z.infer<
  typeof insertCoreWorkspaceInvitesSchema
>
export type SelectCoreWorkspaceInvitesSchema = z.infer<
  typeof selectCoreWorkspaceInvitesSchema
>

export const insertCoreSettingsSchema = createInsertSchema(coreSettings)
export const selectCoreSettingsSchema = createSelectSchema(coreSettings)
export type InsertCoreSettingsSchema = z.infer<typeof insertCoreSettingsSchema>
export type SelectCoreSettingsSchema = z.infer<typeof selectCoreSettingsSchema>

export const insertCoreSubscriptionsSchema =
  createInsertSchema(coreSubscriptions)
export const selectCoreSubscriptionsSchema =
  createSelectSchema(coreSubscriptions)
export type InsertCoreSubscriptionsSchema = z.infer<
  typeof insertCoreSubscriptionsSchema
>
export type SelectCoreSubscriptionsSchema = z.infer<
  typeof selectCoreSubscriptionsSchema
>

export const insertCoreNotificationsSchema = createInsertSchema(
  coreNotificationsSettings
)
export const selectCoreNotificationsSchema = createSelectSchema(
  coreNotificationsSettings
)
export type InsertCoreNotificationsSchema = z.infer<
  typeof insertCoreNotificationsSchema
>
export type SelectCoreNotificationsSchema = z.infer<
  typeof selectCoreNotificationsSchema
>

export const insertRegionsSchema = createInsertSchema(coreRegions)
export const selectCoreRegionsSchema = createSelectSchema(coreRegions)
export type InsertCoreRegionsSchema = z.infer<typeof insertRegionsSchema>
export type SelectCoreRegionsSchema = z.infer<typeof selectCoreRegionsSchema>

export const insertMailBoxesSchema = createInsertSchema(mailMailboxes)
export const selectMailBoxesSchema = createSelectSchema(mailMailboxes)
export type InsertMailBoxesSchema = z.infer<typeof insertMailBoxesSchema>
export type SelectMailBoxesSchema = z.infer<typeof selectMailBoxesSchema>
