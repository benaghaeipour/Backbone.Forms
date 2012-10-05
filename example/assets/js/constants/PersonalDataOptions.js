define(['underscore'], function(_) {
  var PersonalDataOptions;
  PersonalDataOptions = {
      Titles          : ['Mr', 'Mrs', 'Miss', 'Ms']
    , MaritalStatuses : ['Single', 'Married', 'Living with Partner', 'Divorced', 'Widowed', 'Separated']
    , NumDependants   : ['0', '1', '2', '3', '4', '5+']
    , Residencies     : ['Home Owner', 'Shared Owner', 'Tenant-council', 'Tenant - Private', 'Housing Association', 'Living wth Parents/Carers', 'Living with Partner']
    , OccupationBases : ['Employed - Full Time', 'Employed - Part Time', 'Temporary Employment', 'Unemployed', 'Agency', 'Self Employed']
    , OccupationTypes : [ 'Administration / Clerical', 'Armed Forces', 'Director / Senior Manager', 'Home Maker', 'Production Worker'
                        , 'Professional', 'Skilled Manual', 'Student', 'Taxi Driver/chauffeur', 'Unskilled Manual', 'Retired']
  };

  return PersonalDataOptions;
});