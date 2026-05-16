---
"@savvycal/appointments-core": minor
---

**Changed:** -- The `start_date` and `end_date` fields on [Block](https://developers.savvycal.app/api/schemas/block), [CreateBlockRequest](https://developers.savvycal.app/api/schemas/createblockrequest), and [UpdateBlockRequest](https://developers.savvycal.app/api/schemas/updateblockrequest) have been consolidated into a single `date` field. The [List Blocks](https://developers.savvycal.app/api/list-blocks) endpoint's `start_date`, `end_date`, `start_date_min`, `start_date_max`, `end_date_min`, and `end_date_max` query parameters have likewise been replaced with `date`, `date_min`, and `date_max`, and results are now sorted by `date`.
