import crownFirst from '@/assets/crown-first.png';
import { UserRank } from '@/types/userInfo.types';

export default function getCrownImage(rank: UserRank) {
  const crownImages = {
    1: crownFirst,
    2: crownFirst,
    3: crownFirst,
  };
  return crownImages[rank];
}
