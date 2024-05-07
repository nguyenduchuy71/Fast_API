"""update UserShareItem  table

Revision ID: 01ab1d77ccea
Revises: 26130daaddfc
Create Date: 2024-05-07 21:30:07.875980

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '01ab1d77ccea'
down_revision: Union[str, None] = '26130daaddfc'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
