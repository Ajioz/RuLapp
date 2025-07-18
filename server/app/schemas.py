from pydantic import BaseModel, Field
from typing import Optional, Dict

class UIInput(BaseModel):
    engine_type: str
    condition: Optional[str] = "standard"
    row_index: Optional[int] = Field(0, ge=0, description="Row index in the dataset")
    data: Dict[str, float]  # e.g., {"sensor1": 100.0, "sensor2": 90.5}
