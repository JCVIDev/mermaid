import { test } from '@playwright/test';
import { imgSnapshotTest } from '../../helpers/util.ts';

test.describe('C4 diagram', () => {
  test('C4.7 should apply per-element font config', async ({ page }, testInfo) => {
    for (const { fontFamily, fontSize } of [
      { fontFamily: 'courier', fontSize: 14 },
      { fontFamily: 'serif', fontSize: 24 },
    ]) {
      await imgSnapshotTest(
        page,
        testInfo,
        `---
title: personFontFamily=${fontFamily} personFontSize=${fontSize}
config:
  c4:
    personFontFamily: ${fontFamily}
    personFontSize: ${fontSize}
---
C4Context
  Person(customerA, "Banking Customer A", "A customer of the bank.")
  System(SystemAA, "Internet Banking System", "Allows customers to view information.")
  Rel(customerA, SystemAA, "Uses")
        `,
        { name: `personFontFamily=${fontFamily} personFontSize=${fontSize}` }
      );
    }
  });

  test('C4.8 should wrap element text at c4.width', async ({ page }, testInfo) => {
    for (const width of [216, 4000]) {
      await imgSnapshotTest(
        page,
        testInfo,
        `---
title: wrap at c4.width=${width}
config:
  wrap: true
  c4:
    width: ${width}
---
C4Context
  System(s, "System", "A long description that wraps at the default width and stays on one line when the width is large")
        `,
        { name: `wrap at c4.width=${width}` }
      );
    }
  });
});
