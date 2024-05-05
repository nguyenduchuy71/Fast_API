"""create avatar coloumn of user table

Revision ID: 8135185d8a66
Revises: 0f2a8d871028
Create Date: 2024-04-07 15:07:06.262699

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '8135185d8a66'
down_revision: Union[str, None] = '0f2a8d871028'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
