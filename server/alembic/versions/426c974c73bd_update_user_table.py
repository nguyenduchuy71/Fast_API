"""Update user table

Revision ID: 426c974c73bd
Revises: 9b8c46ca6e91
Create Date: 2024-03-17 16:28:05.523256

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '426c974c73bd'
down_revision: Union[str, None] = '9b8c46ca6e91'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index('ix_items_owner_id', table_name='items')
    op.drop_index('ix_items_title', table_name='items')
    op.drop_table('items')
    op.drop_index('ix_friends_friend_id', table_name='friends')
    op.drop_index('ix_friends_owner_id', table_name='friends')
    op.drop_table('friends')
    op.drop_index('ix_users_email', table_name='users')
    op.drop_table('users')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.VARCHAR(), nullable=False),
    sa.Column('email', sa.VARCHAR(), nullable=True),
    sa.Column('hashed_password', sa.VARCHAR(), nullable=True),
    sa.Column('bio', sa.VARCHAR(), nullable=True),
    sa.Column('is_active', sa.BOOLEAN(), nullable=True),
    sa.Column('createdAt', sa.DATETIME(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_users_email', 'users', ['email'], unique=1)
    op.create_table('friends',
    sa.Column('id', sa.VARCHAR(), nullable=False),
    sa.Column('owner_id', sa.VARCHAR(), nullable=True),
    sa.Column('friend_id', sa.VARCHAR(), nullable=True),
    sa.Column('createdAt', sa.DATETIME(), nullable=True),
    sa.Column('is_add_friend', sa.BOOLEAN(), nullable=True),
    sa.Column('is_accept_friend', sa.BOOLEAN(), nullable=True),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_friends_owner_id', 'friends', ['owner_id'], unique=False)
    op.create_index('ix_friends_friend_id', 'friends', ['friend_id'], unique=False)
    op.create_table('items',
    sa.Column('id', sa.VARCHAR(), nullable=False),
    sa.Column('title', sa.VARCHAR(), nullable=True),
    sa.Column('owner_id', sa.VARCHAR(), nullable=True),
    sa.Column('createdAt', sa.DATETIME(), nullable=True),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_items_title', 'items', ['title'], unique=False)
    op.create_index('ix_items_owner_id', 'items', ['owner_id'], unique=False)
    # ### end Alembic commands ###
