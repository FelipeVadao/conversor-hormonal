export type CompoundType = 'injectable' | 'oral'

export interface Compound {
  id: string
  nameKey: string
  popularName: string
  type: CompoundType
  noteKey?: string
  sideEffectsKey?: string
}

export const compounds: Compound[] = [
  // Injetáveis
  { id: 'test-e',    nameKey: 'compound.testE',    popularName: 'Test E',         type: 'injectable', noteKey: 'frequencyNotes.testE',    sideEffectsKey: 'sideEffects.testE'    },
  { id: 'test-c',    nameKey: 'compound.testC',    popularName: 'Test C',         type: 'injectable', noteKey: 'frequencyNotes.testC',    sideEffectsKey: 'sideEffects.testC'    },
  { id: 'test-p',    nameKey: 'compound.testP',    popularName: 'Test P',         type: 'injectable', noteKey: 'frequencyNotes.testP',    sideEffectsKey: 'sideEffects.testP'    },
  { id: 'test-susp', nameKey: 'compound.testSusp', popularName: 'Test Susp',      type: 'injectable', noteKey: 'frequencyNotes.testSusp', sideEffectsKey: 'sideEffects.testSusp' },
  { id: 'sust',      nameKey: 'compound.sust',     popularName: 'Sust 250',       type: 'injectable', noteKey: 'frequencyNotes.sust',     sideEffectsKey: 'sideEffects.sust'     },
  { id: 'deca',      nameKey: 'compound.deca',     popularName: 'Deca',           type: 'injectable', noteKey: 'frequencyNotes.deca',     sideEffectsKey: 'sideEffects.deca'     },
  { id: 'npp',       nameKey: 'compound.npp',      popularName: 'NPP',            type: 'injectable', noteKey: 'frequencyNotes.npp',      sideEffectsKey: 'sideEffects.npp'      },
  { id: 'eq',        nameKey: 'compound.eq',       popularName: 'EQ / Equipoise', type: 'injectable', noteKey: 'frequencyNotes.eq',       sideEffectsKey: 'sideEffects.eq'       },
  { id: 'tren-a',    nameKey: 'compound.trenA',    popularName: 'Tren A',         type: 'injectable', noteKey: 'frequencyNotes.trenA',    sideEffectsKey: 'sideEffects.trenA'    },
  { id: 'tren-e',    nameKey: 'compound.trenE',    popularName: 'Tren E',         type: 'injectable', noteKey: 'frequencyNotes.trenE',    sideEffectsKey: 'sideEffects.trenE'    },
  { id: 'mast-p',    nameKey: 'compound.mastP',    popularName: 'Masteron P',     type: 'injectable', noteKey: 'frequencyNotes.mastP',    sideEffectsKey: 'sideEffects.mastP'    },
  { id: 'mast-e',    nameKey: 'compound.mastE',    popularName: 'Masteron E',     type: 'injectable', noteKey: 'frequencyNotes.mastE',    sideEffectsKey: 'sideEffects.mastE'    },
  { id: 'winny-inj', nameKey: 'compound.winnyInj', popularName: 'Winstrol Depot', type: 'injectable', noteKey: 'frequencyNotes.winnyInj', sideEffectsKey: 'sideEffects.winnyInj' },
  { id: 'primo-inj', nameKey: 'compound.primoInj', popularName: 'Primobolan Inj', type: 'injectable', noteKey: 'frequencyNotes.primoInj', sideEffectsKey: 'sideEffects.primoInj' },
  { id: 'gh',        nameKey: 'compound.gh',       popularName: 'GH / HGH',       type: 'injectable', noteKey: 'frequencyNotes.gh',       sideEffectsKey: 'sideEffects.gh'       },
  { id: 'custom',    nameKey: 'compound.custom',   popularName: '',               type: 'injectable' },
  // Orais
  { id: 'anavar',    nameKey: 'compound.anavar',   popularName: 'Anavar',         type: 'oral', sideEffectsKey: 'sideEffects.anavar'    },
  { id: 'winny-oral',nameKey: 'compound.winnyOral',popularName: 'Winstrol Oral',  type: 'oral', sideEffectsKey: 'sideEffects.winnyOral' },
  { id: 'dbol',      nameKey: 'compound.dbol',     popularName: 'Dianabol / Dbol',type: 'oral', sideEffectsKey: 'sideEffects.dbol'      },
  { id: 'adrol',     nameKey: 'compound.adrol',    popularName: 'Anadrol',        type: 'oral', sideEffectsKey: 'sideEffects.adrol'     },
  { id: 'tbol',      nameKey: 'compound.tbol',     popularName: 'Tbol',           type: 'oral', sideEffectsKey: 'sideEffects.tbol'      },
  { id: 'primo-oral',nameKey: 'compound.primoOral',popularName: 'Primobolan Oral',type: 'oral', sideEffectsKey: 'sideEffects.primoOral' },
  { id: 'proviron',  nameKey: 'compound.proviron', popularName: 'Proviron',       type: 'oral', sideEffectsKey: 'sideEffects.proviron'  },
  { id: 'anastrozol',nameKey: 'compound.anastrozol',popularName: 'Anastrozol',   type: 'oral' },
  { id: 'letrozol',  nameKey: 'compound.letrozol', popularName: 'Letrozol',       type: 'oral' },
  { id: 'nolvadex',  nameKey: 'compound.nolvadex', popularName: 'Nolvadex',       type: 'oral' },
  { id: 'hcg',       nameKey: 'compound.hcg',      popularName: 'HCG',            type: 'oral' },
]
