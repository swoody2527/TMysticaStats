const factionInformation = {
  alchemists:     { name: 'Alchemists',     color: '#6f00ff' },
  auren:          { name: 'Auren',          color: '#007f0e' },
  chaosmagicians: { name: 'Chaos Magicians', color: '#b30000' },
  cultists:       { name: 'Cultists',       color: '#a87000' },
  darklings:      { name: 'Darklings',      color: '#6f00ff' },
  dwarves:        { name: 'Dwarves',        color: '#8c8c8c' },
  engineers:      { name: 'Engineers',      color: '#8c8c8c' },
  fakirs:         { name: 'Fakirs',         color: '#e6ac00' },
  giants:         { name: 'Giants',         color: '#b30000' },
  halflings:      { name: 'Halflings',      color: '#a87000' },
  mermaids:       { name: 'Mermaids',       color: '#0099ff' },
  nomads:         { name: 'Nomads',         color: '#e6ac00' },
  swarmlings:     { name: 'Swarmlings',     color: '#0099ff' },
  witches:        { name: 'Witches',        color: '#007f0e' },
  yetis:          { name: 'Yetis',          color: '#00ccff' },
  icemaidens:     { name: 'Ice Maidens',     color: '#00ccff' },
  acolytes:       { name: 'Acolytes',       color: '#6f00ff' },
  dragonlords:    { name: 'Dragonlords',    color: '#b30000' },
  riverwalkers:   { name: 'Riverwalkers',   color: '#0099ff' },
  shapeshifters:  { name: 'Shapeshifters',  color: '#a87000' }
};


const mapInformation = {
    '126fe960806d587c78546b30f1a90853b1ada468': { map_name: 'Original', color: '#4A4A4A' },
    '91645cdb135773c2a7a50e5ca9cb18af54c664c4': { map_name: 'Original [2017 vp]', color: '#5C5C5C' },
    '95a66999127893f5925a5f591d54f8bcb9a670e6': { map_name: 'Fire & Ice v1', color: '#FF5733' },
    'be8f6ebf549404d015547152d5f2a1906ae8dd90': { map_name: 'Fire & Ice v2', color: '#66CCFF' },
    'fdb13a13cd48b7a3c3525f27e4628ff6905aa5b1': { map_name: 'Loon Lakes v1.6', color: '#88C999' },
    '2afadc63f4d81e850b7c16fb21a1dcd29658c392': { map_name: 'Fjords v2.1', color: '#A9CDEB' }
  };

const mapInformationByName = {
  'Original': { color: '#4A4A4A' },
  'Original [2017 vp]': { color: '#5C5C5C' },
  'Fire & Ice v1': { color: '#FF5733' },
  'Fire & Ice v2': { color: '#66CCFF' },
  'Loon Lakes v1.6': { color: '#88C999' },
  'Fjords v2.1': { color: '#A9CDEB' }
};


export { factionInformation, mapInformation, mapInformationByName }