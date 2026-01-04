class CreateUsers < ActiveRecord::Migration[8.1]
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :password_digest, null: false

      # password reset
      t.string   :reset_password_token_digest
      t.datetime :reset_password_sent_at

      t.timestamps
    end

    add_index :users, :email, unique: true
    add_index :users, :reset_password_token_digest, unique: true
  end
end
