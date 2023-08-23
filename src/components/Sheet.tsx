import React, { useMemo } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { Portal } from '@gorhom/portal';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { colors } from '../constants/globalStyle';

export default function Sheet({
  bottomSheetRef,
  children,
}: {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
  children: React.ReactNode;
}) {
  const snapPoints = useMemo(() => ['100%'], []);

  return (
    <Portal>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: colors.temp.gray }}>
        {children}
      </BottomSheet>
    </Portal>
  );
}
