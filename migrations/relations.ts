import { relations } from "drizzle-orm/relations";
import { coreUsers, coreUserProfiles, coreChannels, coreWorkspaces, coreWorkspaceCurrencies, coreCurrencies, contactsContactsTypes, contactsContacts, cmsSpaces, cmsRowsTypes, cmsRowsFields, cmsRowsValidators, cmsRowsValues, cmsRows, contactsTagToContact, contactsTags, contactsContactsFields, contactsTagToContactType, contactsContactsValidators, contactsContactsValues, mediaFormats, mediaFiles, mediaFileMediaFormats, mediaFolders, mediaFileToFolder, mailMailboxes, coreRoles, corePlans, corePlanQuotas, coreQuotaTypes, coreQuotaUsage, corePlanPrices, coreSubscriptions, corePayments, coreQuotaTypePrices, coreSettings, coreViews, corePermissions, coreUsersRoles, coreWorkspaceInvites, coreRegions, coreWorkspacesApps, coreDefaultViews, coreApiKeys, coreWorkspacesUsers, coreRecentlyUsedApps, sitebuilderV1Apis, sitebuilderV1Entities, sitebuilderV1Variables, sitebuilderV1Projects, coreNotificationsSettings, coreBankAccounts, relationshipsAvatarToUser, relationshipsImageToWorkspace } from "./schema";

export const coreUserProfilesRelations = relations(coreUserProfiles, ({one}) => ({
	coreUser: one(coreUsers, {
		fields: [coreUserProfiles.userId],
		references: [coreUsers.id]
	}),
}));

export const coreUsersRelations = relations(coreUsers, ({many}) => ({
	coreUserProfiles: many(coreUserProfiles),
	coreChannels: many(coreChannels),
	coreWorkspaceCurrencies: many(coreWorkspaceCurrencies),
	mediaFormats: many(mediaFormats),
	mediaFolders: many(mediaFolders),
	mediaFiles: many(mediaFiles),
	mailMailboxes: many(mailMailboxes),
	coreViews: many(coreViews),
	coreUsersRoles: many(coreUsersRoles),
	coreWorkspaceInvites: many(coreWorkspaceInvites),
	coreWorkspaces: many(coreWorkspaces),
	coreApiKeys: many(coreApiKeys),
	coreWorkspacesUsers: many(coreWorkspacesUsers),
	coreRecentlyUsedApps: many(coreRecentlyUsedApps),
	sitebuilderV1Apis: many(sitebuilderV1Apis),
	sitebuilderV1Variables: many(sitebuilderV1Variables),
	sitebuilderV1Entities: many(sitebuilderV1Entities),
	sitebuilderV1Projects: many(sitebuilderV1Projects),
	coreNotificationsSettings: many(coreNotificationsSettings),
	coreBankAccounts: many(coreBankAccounts),
	relationshipsAvatarToUsers: many(relationshipsAvatarToUser),
}));

export const coreChannelsRelations = relations(coreChannels, ({one}) => ({
	coreUser: one(coreUsers, {
		fields: [coreChannels.createdById],
		references: [coreUsers.id]
	}),
	coreWorkspace: one(coreWorkspaces, {
		fields: [coreChannels.workspaceId],
		references: [coreWorkspaces.id]
	}),
}));

export const coreWorkspacesRelations = relations(coreWorkspaces, ({one, many}) => ({
	coreChannels: many(coreChannels),
	coreWorkspaceCurrencies: many(coreWorkspaceCurrencies),
	contactsContacts: many(contactsContacts),
	contactsContactsTypes: many(contactsContactsTypes),
	cmsRowsTypes: many(cmsRowsTypes),
	cmsSpaces: many(cmsSpaces),
	cmsRowsValidators: many(cmsRowsValidators),
	contactsContactsValidators: many(contactsContactsValidators),
	cmsRowsFields: many(cmsRowsFields),
	contactsContactsFields: many(contactsContactsFields),
	cmsRows: many(cmsRows),
	mediaFormats: many(mediaFormats),
	mediaFolders: many(mediaFolders),
	mediaFileToFolders: many(mediaFileToFolder),
	mediaFiles: many(mediaFiles),
	mailMailboxes: many(mailMailboxes),
	coreRoles: many(coreRoles),
	coreQuotaUsages: many(coreQuotaUsage),
	coreSubscriptions: many(coreSubscriptions),
	corePayments: many(corePayments),
	coreSettings: many(coreSettings),
	coreViews: many(coreViews),
	coreUsersRoles: many(coreUsersRoles),
	coreWorkspaceInvites: many(coreWorkspaceInvites),
	contactsTags: many(contactsTags),
	coreUser: one(coreUsers, {
		fields: [coreWorkspaces.ownerId],
		references: [coreUsers.id]
	}),
	corePlan: one(corePlans, {
		fields: [coreWorkspaces.planId],
		references: [corePlans.id]
	}),
	coreRegion: one(coreRegions, {
		fields: [coreWorkspaces.regionId],
		references: [coreRegions.id]
	}),
	coreWorkspacesApps: many(coreWorkspacesApps),
	coreDefaultViews: many(coreDefaultViews),
	coreApiKeys: many(coreApiKeys),
	coreWorkspacesUsers: many(coreWorkspacesUsers),
	coreRecentlyUsedApps: many(coreRecentlyUsedApps),
	sitebuilderV1Apis: many(sitebuilderV1Apis),
	sitebuilderV1Variables: many(sitebuilderV1Variables),
	sitebuilderV1Entities: many(sitebuilderV1Entities),
	sitebuilderV1Projects: many(sitebuilderV1Projects),
	coreNotificationsSettings: many(coreNotificationsSettings),
	coreBankAccounts: many(coreBankAccounts),
	relationshipsImageToWorkspaces: many(relationshipsImageToWorkspace),
}));

export const coreWorkspaceCurrenciesRelations = relations(coreWorkspaceCurrencies, ({one}) => ({
	coreUser: one(coreUsers, {
		fields: [coreWorkspaceCurrencies.createdById],
		references: [coreUsers.id]
	}),
	coreCurrency: one(coreCurrencies, {
		fields: [coreWorkspaceCurrencies.currencyId],
		references: [coreCurrencies.id]
	}),
	coreWorkspace: one(coreWorkspaces, {
		fields: [coreWorkspaceCurrencies.workspaceId],
		references: [coreWorkspaces.id]
	}),
}));

export const coreCurrenciesRelations = relations(coreCurrencies, ({many}) => ({
	coreWorkspaceCurrencies: many(coreWorkspaceCurrencies),
	corePlanPrices: many(corePlanPrices),
	corePayments: many(corePayments),
	coreQuotaTypePrices: many(coreQuotaTypePrices),
}));

export const contactsContactsRelations = relations(contactsContacts, ({one, many}) => ({
	contactsContactsType: one(contactsContactsTypes, {
		fields: [contactsContacts.typeId],
		references: [contactsContactsTypes.id]
	}),
	coreWorkspace: one(coreWorkspaces, {
		fields: [contactsContacts.workspaceId],
		references: [coreWorkspaces.id]
	}),
	contactsTagToContacts: many(contactsTagToContact),
	contactsContactsValues: many(contactsContactsValues),
}));

export const contactsContactsTypesRelations = relations(contactsContactsTypes, ({one, many}) => ({
	contactsContacts: many(contactsContacts),
	coreWorkspace: one(coreWorkspaces, {
		fields: [contactsContactsTypes.workspaceId],
		references: [coreWorkspaces.id]
	}),
	contactsTagToContactTypes: many(contactsTagToContactType),
}));

export const cmsRowsTypesRelations = relations(cmsRowsTypes, ({one, many}) => ({
	cmsSpace: one(cmsSpaces, {
		fields: [cmsRowsTypes.spaceId],
		references: [cmsSpaces.id]
	}),
	coreWorkspace: one(coreWorkspaces, {
		fields: [cmsRowsTypes.workspaceId],
		references: [coreWorkspaces.id]
	}),
	cmsRowsFields: many(cmsRowsFields),
	cmsRows: many(cmsRows),
}));

export const cmsSpacesRelations = relations(cmsSpaces, ({one, many}) => ({
	cmsRowsTypes: many(cmsRowsTypes),
	coreWorkspace: one(coreWorkspaces, {
		fields: [cmsSpaces.workspaceId],
		references: [coreWorkspaces.id]
	}),
}));

export const cmsRowsValidatorsRelations = relations(cmsRowsValidators, ({one}) => ({
	cmsRowsField: one(cmsRowsFields, {
		fields: [cmsRowsValidators.fieldId],
		references: [cmsRowsFields.id]
	}),
	coreWorkspace: one(coreWorkspaces, {
		fields: [cmsRowsValidators.workspaceId],
		references: [coreWorkspaces.id]
	}),
}));

export const cmsRowsFieldsRelations = relations(cmsRowsFields, ({one, many}) => ({
	cmsRowsValidators: many(cmsRowsValidators),
	cmsRowsValues: many(cmsRowsValues),
	cmsRowsType: one(cmsRowsTypes, {
		fields: [cmsRowsFields.typeId],
		references: [cmsRowsTypes.id]
	}),
	coreWorkspace: one(coreWorkspaces, {
		fields: [cmsRowsFields.workspaceId],
		references: [coreWorkspaces.id]
	}),
}));

export const cmsRowsValuesRelations = relations(cmsRowsValues, ({one}) => ({
	cmsRowsField: one(cmsRowsFields, {
		fields: [cmsRowsValues.fieldId],
		references: [cmsRowsFields.id]
	}),
	cmsRow: one(cmsRows, {
		fields: [cmsRowsValues.rowId],
		references: [cmsRows.id]
	}),
}));

export const cmsRowsRelations = relations(cmsRows, ({one, many}) => ({
	cmsRowsValues: many(cmsRowsValues),
	cmsRowsType: one(cmsRowsTypes, {
		fields: [cmsRows.typeId],
		references: [cmsRowsTypes.id]
	}),
	coreWorkspace: one(coreWorkspaces, {
		fields: [cmsRows.workspaceId],
		references: [coreWorkspaces.id]
	}),
}));

export const contactsTagToContactRelations = relations(contactsTagToContact, ({one}) => ({
	contactsContact: one(contactsContacts, {
		fields: [contactsTagToContact.contactId],
		references: [contactsContacts.id]
	}),
	contactsTag: one(contactsTags, {
		fields: [contactsTagToContact.tagId],
		references: [contactsTags.id]
	}),
}));

export const contactsTagsRelations = relations(contactsTags, ({one, many}) => ({
	contactsTagToContacts: many(contactsTagToContact),
	coreWorkspace: one(coreWorkspaces, {
		fields: [contactsTags.workspaceId],
		references: [coreWorkspaces.id]
	}),
}));

export const contactsTagToContactTypeRelations = relations(contactsTagToContactType, ({one}) => ({
	contactsContactsField: one(contactsContactsFields, {
		fields: [contactsTagToContactType.fieldId],
		references: [contactsContactsFields.id]
	}),
	contactsContactsType: one(contactsContactsTypes, {
		fields: [contactsTagToContactType.typeId],
		references: [contactsContactsTypes.id]
	}),
}));

export const contactsContactsFieldsRelations = relations(contactsContactsFields, ({one, many}) => ({
	contactsTagToContactTypes: many(contactsTagToContactType),
	contactsContactsValidators: many(contactsContactsValidators),
	coreWorkspace: one(coreWorkspaces, {
		fields: [contactsContactsFields.workspaceId],
		references: [coreWorkspaces.id]
	}),
	contactsContactsValues: many(contactsContactsValues),
}));

export const contactsContactsValidatorsRelations = relations(contactsContactsValidators, ({one}) => ({
	contactsContactsField: one(contactsContactsFields, {
		fields: [contactsContactsValidators.fieldId],
		references: [contactsContactsFields.id]
	}),
	coreWorkspace: one(coreWorkspaces, {
		fields: [contactsContactsValidators.workspaceId],
		references: [coreWorkspaces.id]
	}),
}));

export const contactsContactsValuesRelations = relations(contactsContactsValues, ({one}) => ({
	contactsContactsField: one(contactsContactsFields, {
		fields: [contactsContactsValues.fieldId],
		references: [contactsContactsFields.id]
	}),
	contactsContact: one(contactsContacts, {
		fields: [contactsContactsValues.rowId],
		references: [contactsContacts.id]
	}),
}));

export const mediaFormatsRelations = relations(mediaFormats, ({one, many}) => ({
	coreUser: one(coreUsers, {
		fields: [mediaFormats.createdById],
		references: [coreUsers.id]
	}),
	coreWorkspace: one(coreWorkspaces, {
		fields: [mediaFormats.workspaceId],
		references: [coreWorkspaces.id]
	}),
	mediaFileMediaFormats: many(mediaFileMediaFormats),
}));

export const mediaFileMediaFormatsRelations = relations(mediaFileMediaFormats, ({one}) => ({
	mediaFile: one(mediaFiles, {
		fields: [mediaFileMediaFormats.fileId],
		references: [mediaFiles.id]
	}),
	mediaFormat: one(mediaFormats, {
		fields: [mediaFileMediaFormats.formatId],
		references: [mediaFormats.id]
	}),
}));

export const mediaFilesRelations = relations(mediaFiles, ({one, many}) => ({
	mediaFileMediaFormats: many(mediaFileMediaFormats),
	mediaFileToFolders: many(mediaFileToFolder),
	coreUser: one(coreUsers, {
		fields: [mediaFiles.createdById],
		references: [coreUsers.id]
	}),
	coreWorkspace: one(coreWorkspaces, {
		fields: [mediaFiles.workspaceId],
		references: [coreWorkspaces.id]
	}),
	relationshipsAvatarToUsers: many(relationshipsAvatarToUser),
	relationshipsImageToWorkspaces: many(relationshipsImageToWorkspace),
}));

export const mediaFoldersRelations = relations(mediaFolders, ({one, many}) => ({
	coreUser: one(coreUsers, {
		fields: [mediaFolders.createdById],
		references: [coreUsers.id]
	}),
	coreWorkspace: one(coreWorkspaces, {
		fields: [mediaFolders.workspaceId],
		references: [coreWorkspaces.id]
	}),
	mediaFolder: one(mediaFolders, {
		fields: [mediaFolders.parentFolderId],
		references: [mediaFolders.id],
		relationName: "mediaFolders_parentFolderId_mediaFolders_id"
	}),
	mediaFolders: many(mediaFolders, {
		relationName: "mediaFolders_parentFolderId_mediaFolders_id"
	}),
	mediaFileToFolders: many(mediaFileToFolder),
}));

export const mediaFileToFolderRelations = relations(mediaFileToFolder, ({one}) => ({
	mediaFile: one(mediaFiles, {
		fields: [mediaFileToFolder.fileId],
		references: [mediaFiles.id]
	}),
	mediaFolder: one(mediaFolders, {
		fields: [mediaFileToFolder.folderId],
		references: [mediaFolders.id]
	}),
	coreWorkspace: one(coreWorkspaces, {
		fields: [mediaFileToFolder.workspaceId],
		references: [coreWorkspaces.id]
	}),
}));

export const mailMailboxesRelations = relations(mailMailboxes, ({one}) => ({
	coreUser: one(coreUsers, {
		fields: [mailMailboxes.createdById],
		references: [coreUsers.id]
	}),
	coreWorkspace: one(coreWorkspaces, {
		fields: [mailMailboxes.workspaceId],
		references: [coreWorkspaces.id]
	}),
}));

export const coreRolesRelations = relations(coreRoles, ({one, many}) => ({
	coreWorkspace: one(coreWorkspaces, {
		fields: [coreRoles.workspaceId],
		references: [coreWorkspaces.id]
	}),
	corePermissions: many(corePermissions),
	coreUsersRoles: many(coreUsersRoles),
	coreWorkspaceInvites: many(coreWorkspaceInvites),
	coreApiKeys: many(coreApiKeys),
}));

export const corePlanQuotasRelations = relations(corePlanQuotas, ({one}) => ({
	corePlan: one(corePlans, {
		fields: [corePlanQuotas.planId],
		references: [corePlans.id]
	}),
	coreQuotaType: one(coreQuotaTypes, {
		fields: [corePlanQuotas.quotaTypeId],
		references: [coreQuotaTypes.id]
	}),
}));

export const corePlansRelations = relations(corePlans, ({many}) => ({
	corePlanQuotas: many(corePlanQuotas),
	corePlanPrices: many(corePlanPrices),
	coreSubscriptions: many(coreSubscriptions),
	coreWorkspaces: many(coreWorkspaces),
}));

export const coreQuotaTypesRelations = relations(coreQuotaTypes, ({many}) => ({
	corePlanQuotas: many(corePlanQuotas),
	coreQuotaUsages: many(coreQuotaUsage),
	coreQuotaTypePrices: many(coreQuotaTypePrices),
}));

export const coreQuotaUsageRelations = relations(coreQuotaUsage, ({one}) => ({
	coreQuotaType: one(coreQuotaTypes, {
		fields: [coreQuotaUsage.quotaTypeId],
		references: [coreQuotaTypes.id]
	}),
	coreWorkspace: one(coreWorkspaces, {
		fields: [coreQuotaUsage.workspaceId],
		references: [coreWorkspaces.id]
	}),
}));

export const corePlanPricesRelations = relations(corePlanPrices, ({one}) => ({
	coreCurrency: one(coreCurrencies, {
		fields: [corePlanPrices.currencyId],
		references: [coreCurrencies.id]
	}),
	corePlan: one(corePlans, {
		fields: [corePlanPrices.planId],
		references: [corePlans.id]
	}),
}));

export const coreSubscriptionsRelations = relations(coreSubscriptions, ({one}) => ({
	corePlan: one(corePlans, {
		fields: [coreSubscriptions.planId],
		references: [corePlans.id]
	}),
	coreWorkspace: one(coreWorkspaces, {
		fields: [coreSubscriptions.workspaceId],
		references: [coreWorkspaces.id]
	}),
}));

export const corePaymentsRelations = relations(corePayments, ({one}) => ({
	coreCurrency: one(coreCurrencies, {
		fields: [corePayments.currencyId],
		references: [coreCurrencies.id]
	}),
	coreWorkspace: one(coreWorkspaces, {
		fields: [corePayments.workspaceId],
		references: [coreWorkspaces.id]
	}),
}));

export const coreQuotaTypePricesRelations = relations(coreQuotaTypePrices, ({one}) => ({
	coreCurrency: one(coreCurrencies, {
		fields: [coreQuotaTypePrices.currencyId],
		references: [coreCurrencies.id]
	}),
	coreQuotaType: one(coreQuotaTypes, {
		fields: [coreQuotaTypePrices.quotaTypeId],
		references: [coreQuotaTypes.id]
	}),
}));

export const coreSettingsRelations = relations(coreSettings, ({one}) => ({
	coreWorkspace: one(coreWorkspaces, {
		fields: [coreSettings.workspaceId],
		references: [coreWorkspaces.id]
	}),
}));

export const coreViewsRelations = relations(coreViews, ({one, many}) => ({
	coreUser: one(coreUsers, {
		fields: [coreViews.createdById],
		references: [coreUsers.id]
	}),
	coreWorkspace: one(coreWorkspaces, {
		fields: [coreViews.workspaceId],
		references: [coreWorkspaces.id]
	}),
	coreDefaultViews: many(coreDefaultViews),
}));

export const corePermissionsRelations = relations(corePermissions, ({one}) => ({
	coreRole: one(coreRoles, {
		fields: [corePermissions.roleId],
		references: [coreRoles.id]
	}),
}));

export const coreUsersRolesRelations = relations(coreUsersRoles, ({one}) => ({
	coreRole: one(coreRoles, {
		fields: [coreUsersRoles.roleId],
		references: [coreRoles.id]
	}),
	coreUser: one(coreUsers, {
		fields: [coreUsersRoles.userId],
		references: [coreUsers.id]
	}),
	coreWorkspace: one(coreWorkspaces, {
		fields: [coreUsersRoles.workspaceId],
		references: [coreWorkspaces.id]
	}),
}));

export const coreWorkspaceInvitesRelations = relations(coreWorkspaceInvites, ({one}) => ({
	coreRole: one(coreRoles, {
		fields: [coreWorkspaceInvites.roleId],
		references: [coreRoles.id]
	}),
	coreUser: one(coreUsers, {
		fields: [coreWorkspaceInvites.userId],
		references: [coreUsers.id]
	}),
	coreWorkspace: one(coreWorkspaces, {
		fields: [coreWorkspaceInvites.workspaceId],
		references: [coreWorkspaces.id]
	}),
}));

export const coreRegionsRelations = relations(coreRegions, ({many}) => ({
	coreWorkspaces: many(coreWorkspaces),
}));

export const coreWorkspacesAppsRelations = relations(coreWorkspacesApps, ({one}) => ({
	coreWorkspace: one(coreWorkspaces, {
		fields: [coreWorkspacesApps.workspaceId],
		references: [coreWorkspaces.id]
	}),
}));

export const coreDefaultViewsRelations = relations(coreDefaultViews, ({one}) => ({
	coreView: one(coreViews, {
		fields: [coreDefaultViews.viewId],
		references: [coreViews.id]
	}),
	coreWorkspace: one(coreWorkspaces, {
		fields: [coreDefaultViews.workspaceId],
		references: [coreWorkspaces.id]
	}),
}));

export const coreApiKeysRelations = relations(coreApiKeys, ({one}) => ({
	coreUser: one(coreUsers, {
		fields: [coreApiKeys.createdById],
		references: [coreUsers.id]
	}),
	coreRole: one(coreRoles, {
		fields: [coreApiKeys.roleId],
		references: [coreRoles.id]
	}),
	coreWorkspace: one(coreWorkspaces, {
		fields: [coreApiKeys.workspaceId],
		references: [coreWorkspaces.id]
	}),
}));

export const coreWorkspacesUsersRelations = relations(coreWorkspacesUsers, ({one}) => ({
	coreUser: one(coreUsers, {
		fields: [coreWorkspacesUsers.userId],
		references: [coreUsers.id]
	}),
	coreWorkspace: one(coreWorkspaces, {
		fields: [coreWorkspacesUsers.workspaceId],
		references: [coreWorkspaces.id]
	}),
}));

export const coreRecentlyUsedAppsRelations = relations(coreRecentlyUsedApps, ({one}) => ({
	coreUser: one(coreUsers, {
		fields: [coreRecentlyUsedApps.createdById],
		references: [coreUsers.id]
	}),
	coreWorkspace: one(coreWorkspaces, {
		fields: [coreRecentlyUsedApps.workspaceId],
		references: [coreWorkspaces.id]
	}),
}));

export const sitebuilderV1ApisRelations = relations(sitebuilderV1Apis, ({one}) => ({
	coreUser: one(coreUsers, {
		fields: [sitebuilderV1Apis.createdById],
		references: [coreUsers.id]
	}),
	sitebuilderV1Entity: one(sitebuilderV1Entities, {
		fields: [sitebuilderV1Apis.entityId],
		references: [sitebuilderV1Entities.id]
	}),
	coreWorkspace: one(coreWorkspaces, {
		fields: [sitebuilderV1Apis.workspaceId],
		references: [coreWorkspaces.id]
	}),
}));

export const sitebuilderV1EntitiesRelations = relations(sitebuilderV1Entities, ({one, many}) => ({
	sitebuilderV1Apis: many(sitebuilderV1Apis),
	sitebuilderV1Variables: many(sitebuilderV1Variables),
	coreUser: one(coreUsers, {
		fields: [sitebuilderV1Entities.createdById],
		references: [coreUsers.id]
	}),
	sitebuilderV1Project: one(sitebuilderV1Projects, {
		fields: [sitebuilderV1Entities.projectId],
		references: [sitebuilderV1Projects.id]
	}),
	coreWorkspace: one(coreWorkspaces, {
		fields: [sitebuilderV1Entities.workspaceId],
		references: [coreWorkspaces.id]
	}),
}));

export const sitebuilderV1VariablesRelations = relations(sitebuilderV1Variables, ({one}) => ({
	coreUser: one(coreUsers, {
		fields: [sitebuilderV1Variables.createdById],
		references: [coreUsers.id]
	}),
	sitebuilderV1Entity: one(sitebuilderV1Entities, {
		fields: [sitebuilderV1Variables.entityId],
		references: [sitebuilderV1Entities.id]
	}),
	coreWorkspace: one(coreWorkspaces, {
		fields: [sitebuilderV1Variables.workspaceId],
		references: [coreWorkspaces.id]
	}),
}));

export const sitebuilderV1ProjectsRelations = relations(sitebuilderV1Projects, ({one, many}) => ({
	sitebuilderV1Entities: many(sitebuilderV1Entities),
	coreUser: one(coreUsers, {
		fields: [sitebuilderV1Projects.createdById],
		references: [coreUsers.id]
	}),
	coreWorkspace: one(coreWorkspaces, {
		fields: [sitebuilderV1Projects.workspaceId],
		references: [coreWorkspaces.id]
	}),
}));

export const coreNotificationsSettingsRelations = relations(coreNotificationsSettings, ({one}) => ({
	coreUser: one(coreUsers, {
		fields: [coreNotificationsSettings.userId],
		references: [coreUsers.id]
	}),
	coreWorkspace: one(coreWorkspaces, {
		fields: [coreNotificationsSettings.workspaceId],
		references: [coreWorkspaces.id]
	}),
}));

export const coreBankAccountsRelations = relations(coreBankAccounts, ({one}) => ({
	coreUser: one(coreUsers, {
		fields: [coreBankAccounts.createdById],
		references: [coreUsers.id]
	}),
	coreWorkspace: one(coreWorkspaces, {
		fields: [coreBankAccounts.workspaceId],
		references: [coreWorkspaces.id]
	}),
}));

export const relationshipsAvatarToUserRelations = relations(relationshipsAvatarToUser, ({one}) => ({
	mediaFile: one(mediaFiles, {
		fields: [relationshipsAvatarToUser.fileId],
		references: [mediaFiles.id]
	}),
	coreUser: one(coreUsers, {
		fields: [relationshipsAvatarToUser.userId],
		references: [coreUsers.id]
	}),
}));

export const relationshipsImageToWorkspaceRelations = relations(relationshipsImageToWorkspace, ({one}) => ({
	mediaFile: one(mediaFiles, {
		fields: [relationshipsImageToWorkspace.fileId],
		references: [mediaFiles.id]
	}),
	coreWorkspace: one(coreWorkspaces, {
		fields: [relationshipsImageToWorkspace.workspaceId],
		references: [coreWorkspaces.id]
	}),
}));