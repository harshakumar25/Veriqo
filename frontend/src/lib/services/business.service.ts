/**
 * Business Service — Single Responsibility Principle (SRP).
 * CRUD operations for the `businesses` Supabase table.
 * Falls back to no-op / in-memory when Supabase is not configured.
 */

import type { BusinessProfile } from '../types';
import { supabase, isSupabaseConfigured } from '../supabase';

function mapRowToBusiness(row: Record<string, unknown>): BusinessProfile {
  return {
    id: row.id as string,
    userId: row.user_id as string | undefined,
    name: row.name as string,
    tradeName: row.trade_name as string,
    entityType: row.entity_type as string,
    cin: row.cin as string,
    pan: row.pan as string,
    gstin: row.gstin as string,
    sector: row.sector as string,
    subSector: row.sub_sector as string,
    state: row.state as string,
    district: row.district as string,
    taluka: row.taluka as string,
    villageCity: row.village_city as string,
    pincode: row.pincode as string,
    locationType: row.location_type as 'MIDC' | 'Non-MIDC',
    industrialArea: row.industrial_area as string,
    plotNumber: row.plot_number as string,
    projectType: row.project_type as string,
    projectStage: row.project_stage as string,
    totalInvestmentInr: row.total_investment_inr as number,
    proposedEmployment: row.proposed_employment as number,
    builtUpAreaSqft: row.built_up_area_sqft as number,
    powerRequirementKw: row.power_requirement_kw as number,
    waterRequirementKld: row.water_requirement_kld as number,
    isFoodStorage: row.is_food_storage as boolean,
    storageType: row.storage_type as string,
    storageCapacityMt: row.storage_capacity_mt as number,
    temperatureRange: row.temperature_range as string,
    contactName: row.contact_name as string,
    contactDesignation: row.contact_designation as string,
    contactEmail: row.contact_email as string,
    contactPhone: row.contact_phone as string,
    profileCompletionPct: row.profile_completion_pct as number,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

function mapBusinessToRow(b: Partial<BusinessProfile>): Record<string, unknown> {
  const row: Record<string, unknown> = {};
  if (b.userId !== undefined) row.user_id = b.userId;
  if (b.name !== undefined) row.name = b.name;
  if (b.tradeName !== undefined) row.trade_name = b.tradeName;
  if (b.entityType !== undefined) row.entity_type = b.entityType;
  if (b.cin !== undefined) row.cin = b.cin;
  if (b.pan !== undefined) row.pan = b.pan;
  if (b.gstin !== undefined) row.gstin = b.gstin;
  if (b.sector !== undefined) row.sector = b.sector;
  if (b.subSector !== undefined) row.sub_sector = b.subSector;
  if (b.state !== undefined) row.state = b.state;
  if (b.district !== undefined) row.district = b.district;
  if (b.taluka !== undefined) row.taluka = b.taluka;
  if (b.villageCity !== undefined) row.village_city = b.villageCity;
  if (b.pincode !== undefined) row.pincode = b.pincode;
  if (b.locationType !== undefined) row.location_type = b.locationType;
  if (b.industrialArea !== undefined) row.industrial_area = b.industrialArea;
  if (b.plotNumber !== undefined) row.plot_number = b.plotNumber;
  if (b.projectType !== undefined) row.project_type = b.projectType;
  if (b.projectStage !== undefined) row.project_stage = b.projectStage;
  if (b.totalInvestmentInr !== undefined) row.total_investment_inr = b.totalInvestmentInr;
  if (b.proposedEmployment !== undefined) row.proposed_employment = b.proposedEmployment;
  if (b.builtUpAreaSqft !== undefined) row.built_up_area_sqft = b.builtUpAreaSqft;
  if (b.powerRequirementKw !== undefined) row.power_requirement_kw = b.powerRequirementKw;
  if (b.waterRequirementKld !== undefined) row.water_requirement_kld = b.waterRequirementKld;
  if (b.isFoodStorage !== undefined) row.is_food_storage = b.isFoodStorage;
  if (b.storageType !== undefined) row.storage_type = b.storageType;
  if (b.storageCapacityMt !== undefined) row.storage_capacity_mt = b.storageCapacityMt;
  if (b.temperatureRange !== undefined) row.temperature_range = b.temperatureRange;
  if (b.contactName !== undefined) row.contact_name = b.contactName;
  if (b.contactDesignation !== undefined) row.contact_designation = b.contactDesignation;
  if (b.contactEmail !== undefined) row.contact_email = b.contactEmail;
  if (b.contactPhone !== undefined) row.contact_phone = b.contactPhone;
  if (b.profileCompletionPct !== undefined) row.profile_completion_pct = b.profileCompletionPct;
  row.updated_at = new Date().toISOString();
  return row;
}

export const BusinessService = {
  async getById(id: string): Promise<BusinessProfile | null> {
    if (!isSupabaseConfigured()) return null;
    const { data, error } = await supabase.from('businesses').select('*').eq('id', id).single();
    if (error) {
      console.warn('[BusinessService] getById failed:', error.message);
      return null;
    }
    return mapRowToBusiness(data as Record<string, unknown>);
  },

  async update(id: string, updates: Partial<BusinessProfile>): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;
    const row = mapBusinessToRow(updates);
    const { error } = await supabase.from('businesses').update(row).eq('id', id);
    if (error) {
      console.warn('[BusinessService] update failed:', error.message);
      return false;
    }
    return true;
  },

  async upsert(profile: BusinessProfile): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;
    const row = { ...mapBusinessToRow(profile), id: profile.id, created_at: profile.createdAt };
    const { error } = await supabase.from('businesses').upsert(row);
    if (error) {
      console.warn('[BusinessService] upsert failed:', error.message);
      return false;
    }
    return true;
  },
};
