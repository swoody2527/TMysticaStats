import BON1 from '../assets/tile-images/BON1.png';
import BON2 from '../assets/tile-images/BON2.png';
import BON3 from '../assets/tile-images/BON3.png';
import BON4 from '../assets/tile-images/BON4.png';
import BON5 from '../assets/tile-images/BON5.png';
import BON6 from '../assets/tile-images/BON6.png';
import BON7 from '../assets/tile-images/BON7.png';
import BON8 from '../assets/tile-images/BON8.png';
import BON9 from '../assets/tile-images/BON9.png';
import BON10 from '../assets/tile-images/BON10.png';

import FAV1 from '../assets/tile-images/FAV1.png';
import FAV2 from '../assets/tile-images/FAV2.png';
import FAV3 from '../assets/tile-images/FAV3.png';
import FAV4 from '../assets/tile-images/FAV4.png';
import FAV5 from '../assets/tile-images/FAV5.png';
import FAV6 from '../assets/tile-images/FAV6.png';
import FAV7 from '../assets/tile-images/FAV7.png';
import FAV8 from '../assets/tile-images/FAV8.png';
import FAV9 from '../assets/tile-images/FAV9.png';
import FAV10 from '../assets/tile-images/FAV10.png';
import FAV11 from '../assets/tile-images/FAV11.png';
import FAV12 from '../assets/tile-images/FAV12.png';

import SCORE1 from '../assets/tile-images/SCORE1.png';
import SCORE2 from '../assets/tile-images/SCORE2.png';
import SCORE3 from '../assets/tile-images/SCORE3.png';
import SCORE4 from '../assets/tile-images/SCORE4.png';
import SCORE5 from '../assets/tile-images/SCORE5.png';
import SCORE6 from '../assets/tile-images/SCORE6.png';
import SCORE7 from '../assets/tile-images/SCORE7.png';
import SCORE8 from '../assets/tile-images/SCORE8.png';

import TW1 from '../assets/tile-images/TW1.png';
import TW2 from '../assets/tile-images/TW2.png';
import TW3 from '../assets/tile-images/TW3.png';
import TW4 from '../assets/tile-images/TW4.png';
import TW5 from '../assets/tile-images/TW5.png';
import TW6 from '../assets/tile-images/TW6.png';
import TW7 from '../assets/tile-images/TW7.png';
import TW7fakirs from '../assets/tile-images/TW7fakirs.png';
import TW8 from '../assets/tile-images/TW8.png';

const tileInfo = {
  bonusTiles: {
    BON1:  { img: BON1,  info: 'Income Phase: collect 1 additional Priest.' },
    BON2:  { img: BON2,  info: 'Action Phase: advance 1 step on a Cult track, Income Phase: 4 coins' },
    BON3:  { img: BON3,  info: 'Income Phase: 6 coins' },
    BON4:  { img: BON4,  info: 'Income Phase: 3 power, Action Phase: Shipping Temporarily Increased By 1' },
    BON5:  { img: BON5,  info: 'Income Phase: 3 power, 1 worker' },
    BON6:  { img: BON6,  info: 'Income Phase: 2 workers, Passing: +4 VP if Stronghold/Sanctuary Built' },
    BON7:  { img: BON7,  info: 'Income Phase: 1 worker, Passing: +2 VP for each Trading Post on board.' },
    BON8:  { img: BON8,  info: 'Income Phase: 1 priest' },
    BON9:  { img: BON9,  info: 'Income Phase: 2 coins, Passing: +1 VP for each Dwelling on board.' },
    BON10: { img: BON10, info: 'Income Phase: 3 power, Passing: +3 VP for each Shipping upgrade.' },
  },

  favorTiles: {
    FAV1:  { img: FAV1,  info: 'Advance 3 steps on Fire cult track.' },
    FAV2:  { img: FAV2,  info: 'Advance 3 steps on Water cult track.' },
    FAV3:  { img: FAV3,  info: 'Advance 3 steps on Earth cult track.' },
    FAV4:  { img: FAV4,  info: 'Advance 3 steps on Air cult track.' },
    FAV5:  { img: FAV5,  info: 'Advance 2 steps on Fire cult track, Ongoing: Towns require 1 fewer building.' },
    FAV6:  { img: FAV6,  info: 'Advance 2 steps on Water cult track, Action Phase: once per round, advance 1 step on any Cult track.' },
    FAV7:  { img: FAV7,  info: 'Advance 2 steps on Earth cult track, Income Phase: 1 worker, 1 power.' },
    FAV8:  { img: FAV8,  info: 'Advance 2 steps on Air cult track, Income Phase: 4 power.' },
    FAV9:  { img: FAV9,  info: 'Advance 1 step on Fire cult track, Income Phase: 3 coins.' },
    FAV10: { img: FAV10, info: 'Advance 1 step on Water cult track, Ongoing: +3 VP whenever you build a Trading Post.' },
    FAV11: { img: FAV11, info: 'Advance 1 step on Earth cult track, Ongoing: +2 VP whenever you build a Dwelling.' },
    FAV12: { img: FAV12, info: 'Advance 1 step on Air cult track, Passing: gain 0/2/3/3/4 VP depending on number of Trading Posts built this round.' },
  },

  scoreTiles: {
    SCORE1: { img: SCORE1, info: 'Scoring: +2 VP for each Spade action used, Round Bonus: 1 Earth → 1 coin' },
    SCORE2: { img: SCORE2, info: 'Scoring: +5 VP for each Town founded, Round Bonus: 4 Earth → 1 Spade' },
    SCORE3: { img: SCORE3, info: 'Scoring: +2 VP for each Dwelling built, Round Bonus: 4 Water → 1 Priest' },
    SCORE4: { img: SCORE4, info: 'Scoring: +5 VP for each Stronghold/Sanctuary built, Round Bonus: 2 Fire → 1 Worker' },
    SCORE5: { img: SCORE5, info: 'Scoring: +2 VP for each Dwelling built, Round Bonus: 4 Fire → 4 Power' },
    SCORE6: { img: SCORE6, info: 'Scoring: +3 VP for each Trading Post built, Round Bonus: 4 Water → 1 Spade' },
    SCORE7: { img: SCORE7, info: 'Scoring: +5 VP for each Stronghold/Sanctuary built, Round Bonus: 2 Air → 1 Worker' },
    SCORE8: { img: SCORE8, info: 'Scoring: +3 VP for each Trading Post built, Round Bonus: 4 Air → 1 Spade' },
  },

  townTiles: {
    TW1:       { img: TW1,       info: 'Reward: 5 VP and 6 coins when founding a Town.' },
    TW2:       { img: TW2,       info: 'Reward: 7 VP and 2 workers when founding a Town.' },
    TW3:       { img: TW3,       info: 'Reward: 9 VP and 1 priest when founding a Town.' },
    TW4:       { img: TW4,       info: 'Reward: 6 VP and 8 power when founding a Town.' },
    TW5:       { img: TW5,       info: 'Reward: 8 VP and advance 1 step on each Cult track when founding a Town.' },
    TW6:       { img: TW6,       info: 'Reward: 2 VP and advance 2 steps on each Cult track when founding a Town.' },
    TW7:       { img: TW7,       info: 'Reward: 4 VP and advance 1 step on the Shipping track when founding a Town.' },
    TW7fakirs: { img: TW7fakirs, info: 'Reward: 4 VP and advance 1 step on the Carpet Flight track when founding a Town.' },
    TW8:       { img: TW8,       info: 'Reward: 11 VP when founding a Town.' },
  },
};


export default tileInfo;
