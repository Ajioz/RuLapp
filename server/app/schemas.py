from pydantic import BaseModel
from typing import Optional, Dict

class UIInput(BaseModel):
    engine_type: str
    condition: Optional[str] = "standard"
    row_index: Optional[int] = 0
    data: Dict
